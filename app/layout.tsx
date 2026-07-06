import type { Metadata, Viewport } from "next";
import { Rubik, Heebo } from "next/font/google";
import { cn } from "@/lib/utils";
import "lenis/dist/lenis.css";
import "./globals.css";

// Rubik = clean geometric sans with full Hebrew support (Geist/Inter equivalent).
const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

// Heebo — the brand wordmark face (logo lockup on the laptop screen).
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-heebo",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) on notched phones
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Solution House — מהנדסים את התשתית להצלחה שלכם",
  description:
    "בית פתרונות טכנולוגיים. הנדסת תוכנה ללא פשרות עם אסתטיקה שקובעת סטנדרטים — אתרים, אפליקציות, מערכות, אוטומציות וסוכני AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={cn(rubik.variable, heebo.variable, "grain")}
    >
      <body className="font-sans antialiased">
        {/* deep-space canvas — a fixed radial wash so nothing sits on flat black */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_-10%,#151515_0%,#0B0B0B_45%,#050505_100%)]"
        />
        {/* ambient color field — soft drifting light the Liquid Glass
            panels refract; without it, backdrop-blur has nothing to bend */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-[8] overflow-hidden">
          <div className="absolute -top-[12%] left-[6%] h-[74vw] w-[74vw] animate-drift-slow rounded-full bg-[#3b6fb8] opacity-[0.11] blur-[80px] sm:h-[46vw] sm:w-[46vw] sm:blur-[130px]" />
          <div className="absolute -right-[12%] top-[34%] h-[60vw] w-[60vw] animate-drift rounded-full bg-[#7d5fd3] opacity-[0.09] blur-[80px] sm:h-[38vw] sm:w-[38vw] sm:blur-[130px]" />
          <div className="absolute -bottom-[16%] left-[26%] h-[66vw] w-[66vw] animate-drift-slow rounded-full bg-[#D9A13B] opacity-[0.06] blur-[90px] sm:h-[42vw] sm:w-[42vw] sm:blur-[140px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
