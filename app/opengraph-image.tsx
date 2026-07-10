import { ImageResponse } from "next/og";

/**
 * The image shown when the site link is shared (WhatsApp / Facebook /
 * Telegram / LinkedIn / X). Next wires it into og:image automatically —
 * no need to reference it from the metadata. Rendered at build time.
 */

export const runtime = "edge";
export const alt = "Solution House — בונים את התשתית להצלחה שלכם";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The house mark (ivory silhouette, S carved out, gold accent dot), inlined
// as an SVG data-URI so it rasterizes crisply into the card.
const LOGO_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><mask id="c"><rect width="100" height="100" fill="#fff"/><path d="M63 41 a 14 14 0 1 0 -22 11.5 C 46 56 51 60 51 70 L 51 94" fill="none" stroke="#000" stroke-width="10" stroke-linecap="round"/><path d="M46 89 L56 89 L56 100 L46 100 Z" fill="#000"/></mask></defs><polygon points="50,6 88,34 88,94 12,94 12,34" fill="#E9E9E5" mask="url(#c)"/><circle cx="49" cy="41" r="6.5" fill="#D9A13B"/></svg>`;

export default function Image() {
  const logo = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 90% at 50% -8%, #191919 0%, #0B0B0B 48%, #050505 100%)",
          color: "#E9E9E5",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={196} height={196} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 66,
            fontWeight: 800,
            letterSpacing: 12,
            display: "flex",
          }}
        >
          SOLUTION HOUSE
        </div>
        <div
          style={{
            width: 120,
            height: 3,
            borderRadius: 2,
            background: "#D9A13B",
            margin: "38px 0 30px",
          }}
        />
        <div
          style={{
            fontSize: 27,
            letterSpacing: 5,
            color: "#9A9A98",
            display: "flex",
          }}
        >
          WEBSITES · SYSTEMS · AUTOMATIONS · AI
        </div>
      </div>
    ),
    { ...size }
  );
}
