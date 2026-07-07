"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  X,
  Plus,
  Minus,
  Contrast,
  Droplet,
  Underline,
  Type,
  Pause,
  Crosshair,
  RotateCcw,
  FileText,
} from "lucide-react";
import { EASE } from "@/lib/motion";
import { useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Flags = {
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  readable: boolean;
  nomotion: boolean;
  focus: boolean;
};

const DEFAULT_FLAGS: Flags = {
  contrast: false,
  grayscale: false,
  links: false,
  readable: false,
  nomotion: false,
  focus: false,
};

const CLASS: Record<keyof Flags, string> = {
  contrast: "a11y-contrast",
  grayscale: "a11y-grayscale",
  links: "a11y-links",
  readable: "a11y-readable",
  nomotion: "a11y-nomotion",
  focus: "a11y-focus",
};

/** Apply the toggle state to the DOM only — never touches storage. */
function applyDom(font: number, flags: Flags) {
  const el = document.documentElement;
  if (font > 0) el.dataset.a11yFont = String(font);
  else delete el.dataset.a11yFont;
  (Object.keys(CLASS) as (keyof Flags)[]).forEach((k) =>
    el.classList.toggle(CLASS[k], flags[k])
  );
}

function persist(font: number, flags: Flags) {
  try {
    localStorage.setItem("sh_a11y", JSON.stringify({ font, ...flags }));
  } catch {
    /* ignore */
  }
}

export function AccessibilityMenu() {
  const tx = useTx();
  const [open, setOpen] = useState(false);
  const [font, setFont] = useState(0);
  const [flags, setFlags] = useState<Flags>(DEFAULT_FLAGS);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // restore saved preferences once (read-only — persistence happens on change)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sh_a11y") || "{}");
      const f = typeof saved.font === "number" ? saved.font : 0;
      const fl: Flags = { ...DEFAULT_FLAGS };
      (Object.keys(DEFAULT_FLAGS) as (keyof Flags)[]).forEach((k) => {
        if (typeof saved[k] === "boolean") fl[k] = saved[k];
      });
      setFont(f);
      setFlags(fl);
    } catch {
      /* ignore */
    }
  }, []);

  // mirror state onto the DOM — idempotent, storage-free, so it's safe to run
  // on the initial default render and re-run after restore without clobbering.
  useEffect(() => {
    applyDom(font, flags);
  }, [font, flags]);

  // Escape closes, return focus to the trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const setFlag = (k: keyof Flags) =>
    setFlags((f) => {
      const next = { ...f, [k]: !f[k] };
      persist(font, next);
      return next;
    });
  const changeFont = (dir: 1 | -1) =>
    setFont((f) => {
      const next = Math.min(3, Math.max(0, f + dir));
      persist(next, flags);
      return next;
    });
  const reset = () => {
    setFont(0);
    setFlags(DEFAULT_FLAGS);
    persist(0, DEFAULT_FLAGS);
  };

  const toggles: { key: keyof Flags; Icon: typeof Contrast; label: { he: string; en: string } }[] = [
    { key: "contrast", Icon: Contrast, label: { he: "ניגודיות גבוהה", en: "High contrast" } },
    { key: "grayscale", Icon: Droplet, label: { he: "גווני אפור", en: "Grayscale" } },
    { key: "links", Icon: Underline, label: { he: "הדגשת קישורים", en: "Highlight links" } },
    { key: "readable", Icon: Type, label: { he: "גופן קריא", en: "Readable font" } },
    { key: "nomotion", Icon: Pause, label: { he: "עצירת אנימציות", en: "Stop animations" } },
    { key: "focus", Icon: Crosshair, label: { he: "סימון פוקוס", en: "Focus outline" } },
  ];

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={tx({ he: "תפריט נגישות", en: "Accessibility menu" })}
        className="fixed bottom-[calc(20px+env(safe-area-inset-bottom))] right-4 z-[110] grid h-12 w-12 place-items-center rounded-full bg-ivory text-ink shadow-[0_16px_40px_-12px_rgba(233,233,229,0.45)] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dot sm:h-14 sm:w-14"
      >
        <Accessibility className="h-6 w-6" strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[109] bg-black/40"
              aria-hidden
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={tx({ he: "אפשרויות נגישות", en: "Accessibility options" })}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="liquid-glass fixed bottom-[calc(84px+env(safe-area-inset-bottom))] right-4 z-[110] flex max-h-[min(560px,calc(100svh-120px))] w-[min(320px,calc(100vw-2rem))] flex-col overflow-y-auto rounded-3xl !bg-[#0D0D10]/95 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-black text-ivory">
                  {tx({ he: "נגישות", en: "Accessibility" })}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={tx({ he: "סגירה", en: "Close" })}
                  className="grid h-8 w-8 place-items-center rounded-full text-mist transition-colors hover:bg-white/[0.06] hover:text-ivory"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* text size */}
              <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
                <span className="text-[13px] font-medium text-body">
                  {tx({ he: "גודל טקסט", en: "Text size" })}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => changeFont(-1)}
                    aria-label={tx({ he: "הקטנת טקסט", en: "Decrease text" })}
                    className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.06] text-ivory transition-colors hover:bg-white/[0.12]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-[12px] font-bold text-dot" aria-hidden>
                    {font === 0 ? "A" : `+${font}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeFont(1)}
                    aria-label={tx({ he: "הגדלת טקסט", en: "Increase text" })}
                    className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.06] text-ivory transition-colors hover:bg-white/[0.12]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* toggles */}
              <div className="grid gap-1.5">
                {toggles.map(({ key, Icon, label }) => {
                  const on = flags[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFlag(key)}
                      aria-pressed={on}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-start text-[13px] font-medium transition-colors",
                        on
                          ? "border-dot/40 bg-dot/10 text-dot"
                          : "border-white/[0.08] bg-white/[0.02] text-body hover:bg-white/[0.05]"
                      )}
                    >
                      <Icon className="h-[17px] w-[17px] shrink-0" strokeWidth={1.8} />
                      <span className="flex-1">{tx(label)}</span>
                      <span
                        className={cn(
                          "text-[11px] font-bold",
                          on ? "text-dot" : "text-mist/60"
                        )}
                      >
                        {on ? tx({ he: "פעיל", en: "On" }) : tx({ he: "כבוי", en: "Off" })}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* reset + statement */}
              <button
                type="button"
                onClick={reset}
                className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-white/[0.1] px-3 py-2.5 text-[13px] font-bold text-ivory transition-colors hover:bg-white/[0.05]"
              >
                <RotateCcw className="h-4 w-4" />
                {tx({ he: "איפוס הגדרות", en: "Reset settings" })}
              </button>
              <a
                href="/accessibility"
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-[12.5px] font-medium text-mist transition-colors hover:text-ivory"
              >
                <FileText className="h-3.5 w-3.5" />
                {tx({ he: "הצהרת הנגישות", en: "Accessibility statement" })}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
