import type { Metadata } from "next";
import { Rubik, JetBrains_Mono, Heebo } from "next/font/google";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/Preloader";
import "lenis/dist/lenis.css";
import "./globals.css";

// Rubik = clean geometric sans with full Hebrew support (Geist/Inter equivalent).
const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Heebo — the brand wordmark face (logo lockup on the laptop screen).
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-heebo",
  display: "swap",
});

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
      className={cn(rubik.variable, mono.variable, heebo.variable, "grain")}
    >
      <body className="font-sans antialiased">
        <Preloader />
        <Cursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
