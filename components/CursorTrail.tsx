"use client";

import { useEffect, useRef } from "react";

/**
 * Real-time fluid simulation cursor trail (apechain-style).
 *
 * A compact WebGL2 Navier-Stokes solver: the pointer splats velocity +
 * dye into half-float fields; each frame runs curl → vorticity
 * confinement → divergence → pressure (Jacobi) → gradient subtraction →
 * advection. Vorticity confinement is what produces the fine, living
 * filaments that keep curling after the pointer rests — the exact look
 * a 2D-canvas feedback loop can't reach.
 *
 * Rendered with mix-blend-screen over the dark canvas (black = neutral),
 * the loop parks itself seconds after the pointer rests. Skipped on
 * touch, reduced-motion, or when WebGL2/float-render support is missing.
 */

const SIM_RES = 128; // velocity field resolution
const DYE_RES = 720; // visible ribbon resolution
const DYE_DISSIPATION = 0.982; // per-frame — trail lives ~2s, tighter tail
const VEL_DISSIPATION = 0.99; // swirls outlive the dye slightly
const PRESSURE_DECAY = 0.8;
const PRESSURE_ITERS = 20;
const CURL = 30; // vorticity confinement strength — the filaments
const SPLAT_RADIUS = 0.0011; // thinner ribbon, closer to the cursor
const SPLAT_FORCE = 3400; // less billow — a leaner trail
const DYE_COLOR: [number, number, number] = [0.17, 0.24, 0.44]; // cool blue, cores add to white
const PARK_MS = 9000;

const VERT = `
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv, vL, vR, vT, vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAG = {
  splat: `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}`,
  advection: `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  gl_FragColor = dissipation * texture2D(uSource, coord);
  gl_FragColor.a = 1.0;
}`,
  curl: `
precision highp float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,
  vorticity: `
precision highp float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  gl_FragColor = vec4(velocity + force * dt, 0.0, 1.0);
}`,
  divergence: `
precision highp float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,
  clear: `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
  gl_FragColor = value * texture2D(uTexture, vUv);
}`,
  pressure: `
precision highp float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`,
  gradientSubtract: `
precision highp float;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`,
  display: `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  gl_FragColor = vec4(c * 0.48, 1.0);
}`,
};

interface FBO {
  fbo: WebGLFramebuffer;
  tex: WebGLTexture;
  texelX: number;
  texelY: number;
  attach: (id: number) => number;
}
interface DoubleFBO {
  read: FBO;
  write: FBO;
  swap: () => void;
  texelX: number;
  texelY: number;
}

export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  const sparkRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null;
    if (!gl) return;
    if (!gl.getExtension("EXT_color_buffer_float")) return;
    gl.getExtension("OES_texture_float_linear");

    // ── program plumbing ─────────────────────────────────────────────
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return gl!.getShaderParameter(s, gl!.COMPILE_STATUS) ? s : null;
    }
    const vert = compile(gl.VERTEX_SHADER, VERT);
    if (!vert) return;

    function program(fragSrc: string) {
      const f = compile(gl!.FRAGMENT_SHADER, fragSrc);
      if (!f) return null;
      const p = gl!.createProgram()!;
      gl!.attachShader(p, vert!);
      gl!.attachShader(p, f);
      gl!.linkProgram(p);
      if (!gl!.getProgramParameter(p, gl!.LINK_STATUS)) return null;
      const uniforms: Record<string, WebGLUniformLocation> = {};
      const n = gl!.getProgramParameter(p, gl!.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const name = gl!.getActiveUniform(p, i)!.name;
        uniforms[name] = gl!.getUniformLocation(p, name)!;
      }
      return { p, u: uniforms };
    }

    const progs = {
      splat: program(FRAG.splat),
      advection: program(FRAG.advection),
      curl: program(FRAG.curl),
      vorticity: program(FRAG.vorticity),
      divergence: program(FRAG.divergence),
      clear: program(FRAG.clear),
      pressure: program(FRAG.pressure),
      gradientSubtract: program(FRAG.gradientSubtract),
      display: program(FRAG.display),
    };
    if (Object.values(progs).some((p) => !p)) return;

    // fullscreen quad
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    // ── FBOs ─────────────────────────────────────────────────────────
    function createFBO(w: number, h: number): FBO {
      const tex = gl!.createTexture()!;
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA16F, w, h, 0, gl!.RGBA, gl!.HALF_FLOAT, null);
      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clearColor(0, 0, 0, 1);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      return {
        fbo,
        tex,
        texelX: 1 / w,
        texelY: 1 / h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, tex);
          return id;
        },
      };
    }
    function createDoubleFBO(w: number, h: number): DoubleFBO {
      let a = createFBO(w, h);
      let b = createFBO(w, h);
      return {
        get read() {
          return a;
        },
        get write() {
          return b;
        },
        swap() {
          [a, b] = [b, a];
        },
        texelX: 1 / w,
        texelY: 1 / h,
      };
    }

    const aspect = () => canvas!.width / Math.max(1, canvas!.height);
    function simSize(base: number): [number, number] {
      const a = Math.max(aspect(), 0.1);
      return a > 1 ? [Math.round(base * a), base] : [base, Math.round(base / a)];
    }

    const sparkC = sparkRef.current;
    const sctx = sparkC ? sparkC.getContext("2d") : null;

    const syncCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      if (sparkC && (sparkC.width !== w || sparkC.height !== h)) {
        sparkC.width = w;
        sparkC.height = h;
      }
    };
    syncCanvas();

    // ── electric micro-sparks — very rare, very faint ────────────────
    type Spark = { pts: [number, number][]; born: number; ttl: number };
    const sparks: Spark[] = [];
    function spawnSpark(x: number, y: number) {
      let ang = Math.random() * Math.PI * 2;
      let sx = x;
      let sy = y;
      const pts: [number, number][] = [[sx, sy]];
      const segs = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < segs; i++) {
        ang += (Math.random() - 0.5) * 1.4;
        const len = 5 + Math.random() * 8;
        sx += Math.cos(ang) * len;
        sy += Math.sin(ang) * len;
        pts.push([sx, sy]);
      }
      sparks.push({ pts, born: performance.now(), ttl: 200 + Math.random() * 180 });
    }
    function renderSparks(now: number) {
      if (!sctx || !sparkC) return;
      sctx.clearRect(0, 0, sparkC.width, sparkC.height);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const t = (now - s.born) / s.ttl;
        if (t >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        const a = (1 - t) * 0.3;
        sctx.strokeStyle = `rgba(190,225,255,${a.toFixed(3)})`;
        sctx.lineWidth = 1;
        sctx.shadowColor = `rgba(125,180,255,${a.toFixed(3)})`;
        sctx.shadowBlur = 4;
        sctx.beginPath();
        sctx.moveTo(s.pts[0][0], s.pts[0][1]);
        for (let j = 1; j < s.pts.length; j++) sctx.lineTo(s.pts[j][0], s.pts[j][1]);
        sctx.stroke();
      }
    }

    const [vw, vh] = simSize(SIM_RES);
    const [dw, dh] = simSize(DYE_RES);
    const velocity = createDoubleFBO(vw, vh);
    const dye = createDoubleFBO(dw, dh);
    const pressure = createDoubleFBO(vw, vh);
    const divergence = createFBO(vw, vh);
    const curlFBO = createFBO(vw, vh);

    function blit(target: FBO | null) {
      if (target) {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo);
        gl!.viewport(0, 0, Math.round(1 / target.texelX), Math.round(1 / target.texelY));
      } else {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        gl!.viewport(0, 0, canvas!.width, canvas!.height);
      }
      gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);
    }

    // ── simulation ───────────────────────────────────────────────────
    type Splat = { x: number; y: number; dx: number; dy: number; speed: number };
    const pending: Splat[] = [];
    let lastMove = -1e9;
    let lastTime = performance.now();
    let rafId = 0;

    function splat(s: Splat) {
      const sp = progs.splat!;
      gl!.useProgram(sp.p);
      gl!.uniform2f(sp.u.texelSize, velocity.texelX, velocity.texelY);
      gl!.uniform1f(sp.u.aspectRatio, aspect());
      gl!.uniform2f(sp.u.point, s.x, s.y);
      gl!.uniform1f(sp.u.radius, SPLAT_RADIUS);
      gl!.uniform1i(sp.u.uTarget, velocity.read.attach(0));
      gl!.uniform3f(sp.u.color, s.dx * SPLAT_FORCE, s.dy * SPLAT_FORCE, 0);
      blit(velocity.write);
      velocity.swap();

      // dye: cool blue that adds toward a white-hot core with speed
      const lift = Math.min(1, s.speed * 22);
      gl!.uniform1i(sp.u.uTarget, dye.read.attach(0));
      gl!.uniform3f(
        sp.u.color,
        DYE_COLOR[0] + lift * 0.22,
        DYE_COLOR[1] + lift * 0.21,
        DYE_COLOR[2] + lift * 0.17
      );
      blit(dye.write);
      dye.swap();
    }

    function frame() {
      rafId = 0;
      syncCanvas();
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 1 / 60);
      lastTime = now;
      const idle = now - lastMove;

      while (pending.length) splat(pending.shift()!);

      // curl
      let pr = progs.curl!;
      gl!.useProgram(pr.p);
      gl!.uniform2f(pr.u.texelSize, velocity.texelX, velocity.texelY);
      gl!.uniform1i(pr.u.uVelocity, velocity.read.attach(0));
      blit(curlFBO);

      // vorticity confinement
      pr = progs.vorticity!;
      gl!.useProgram(pr.p);
      gl!.uniform2f(pr.u.texelSize, velocity.texelX, velocity.texelY);
      gl!.uniform1i(pr.u.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(pr.u.uCurl, curlFBO.attach(1));
      gl!.uniform1f(pr.u.curl, CURL);
      gl!.uniform1f(pr.u.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // divergence
      pr = progs.divergence!;
      gl!.useProgram(pr.p);
      gl!.uniform2f(pr.u.texelSize, velocity.texelX, velocity.texelY);
      gl!.uniform1i(pr.u.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // pressure decay + Jacobi iterations
      pr = progs.clear!;
      gl!.useProgram(pr.p);
      gl!.uniform1i(pr.u.uTexture, pressure.read.attach(0));
      gl!.uniform1f(pr.u.value, PRESSURE_DECAY);
      blit(pressure.write);
      pressure.swap();

      pr = progs.pressure!;
      gl!.useProgram(pr.p);
      gl!.uniform2f(pr.u.texelSize, velocity.texelX, velocity.texelY);
      gl!.uniform1i(pr.u.uDivergence, divergence.attach(0));
      for (let i = 0; i < PRESSURE_ITERS; i++) {
        gl!.uniform1i(pr.u.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // subtract pressure gradient
      pr = progs.gradientSubtract!;
      gl!.useProgram(pr.p);
      gl!.uniform2f(pr.u.texelSize, velocity.texelX, velocity.texelY);
      gl!.uniform1i(pr.u.uPressure, pressure.read.attach(0));
      gl!.uniform1i(pr.u.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // advect velocity, then dye
      pr = progs.advection!;
      gl!.useProgram(pr.p);
      gl!.uniform2f(pr.u.texelSize, velocity.texelX, velocity.texelY);
      gl!.uniform1i(pr.u.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(pr.u.uSource, velocity.read.attach(0));
      gl!.uniform1f(pr.u.dt, dt);
      gl!.uniform1f(pr.u.dissipation, VEL_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl!.uniform1i(pr.u.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(pr.u.uSource, dye.read.attach(1));
      gl!.uniform1f(pr.u.dissipation, DYE_DISSIPATION);
      blit(dye.write);
      dye.swap();

      // draw
      pr = progs.display!;
      gl!.useProgram(pr.p);
      gl!.uniform1i(pr.u.uTexture, dye.read.attach(0));
      blit(null);

      renderSparks(now);

      if (idle < PARK_MS) {
        rafId = requestAnimationFrame(frame);
      } else {
        // parked — leave a clean black canvas, not a frozen ghost frame
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        gl!.viewport(0, 0, canvas!.width, canvas!.height);
        gl!.clearColor(0, 0, 0, 1);
        gl!.clear(gl!.COLOR_BUFFER_BIT);
        if (sctx && sparkC) sctx.clearRect(0, 0, sparkC.width, sparkC.height);
      }
    }

    let px = -1;
    let py = -1;
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / Math.max(1, window.innerWidth);
      const y = 1 - e.clientY / Math.max(1, window.innerHeight);
      if (px >= 0) {
        const dx = x - px;
        const dy = y - py;
        const speed = Math.hypot(dx, dy);
        if (speed > 0.0001) {
          pending.push({ x, y, dx, dy, speed });
          if (pending.length > 24) pending.shift();
        }
        // a tiny static discharge, only on brisk movement — and rarely
        if (speed * window.innerWidth > 17 && Math.random() < 0.085 && sparks.length < 4) {
          spawnSpark(e.clientX, e.clientY);
        }
      }
      px = x;
      py = y;
      lastMove = performance.now();
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[4] h-full w-full mix-blend-screen"
      />
      {/* electric micro-sparks, above the vapor, still behind content */}
      <canvas
        ref={sparkRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[3] h-full w-full mix-blend-screen"
      />
    </>
  );
}
