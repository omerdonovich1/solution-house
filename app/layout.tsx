import type { Metadata, Viewport } from "next";
import { Rubik, Heebo } from "next/font/google";
import { cn } from "@/lib/utils";
import { LanguageProvider, LANG_INIT_SCRIPT } from "@/lib/i18n";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { CookieNotice } from "@/components/CookieNotice";
import { SkipLink } from "@/components/SkipLink";
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

/* ─────────────────────────────────────────────────────────────────────
   תצוגת הקישור בשיתופים (וואטסאפ / פייסבוק / טלגרם / לינקדאין / טוויטר)
   נשלטת מכאן. כדי לשנות את מה שמופיע כשמשתפים את הקישור — ערוך את שלושת
   הקבועים הבאים, ואז דחוף לגיט (git push) כדי שהאתר יתעדכן.
   הערה: פלטפורמות מטמינות את התצוגה — אחרי שינוי אפשר "לרענן" אותה דרך
   https://developers.facebook.com/tools/debug/ (מדביקים את הכתובת ולוחצים
   Scrape Again). וואטסאפ מתעדכן בד"כ תוך זמן קצר לבד.
   ───────────────────────────────────────────────────────────────────── */
const SITE_URL = "https://solutionhouse.dev";
const SITE_TITLE = "Solution House — בונים את התשתית להצלחה שלכם";
const SITE_DESCRIPTION =
  "בית פתרונות טכנולוגיים. הנדסת תוכנה ללא פשרות עם אסתטיקה שקובעת סטנדרטים — אתרים, אפליקציות, מערכות, אוטומציות וסוכני AI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Solution House",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "he_IL",
    // תמונת התצוגה (1200×630) נוצרת אוטומטית ע"י app/opengraph-image.tsx —
    // כדי לשנות אותה עורכים את הקובץ ההוא (אין צורך להגדיר images כאן).
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_INIT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        {/* deep-space canvas — a fixed radial wash so nothing sits on flat black */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_-10%,#151515_0%,#0B0B0B_45%,#050505_100%)]"
        />
        {/* The drifting blue/purple/gold blobs that used to live here were
            removed: they muddied the black, fought the monochrome thesis of
            the palette, and were one of six ambient systems running at once.
            The canvas is now the radial wash above plus the neural field. */}
        <LanguageProvider>
          <SkipLink />
          {children}
          <AccessibilityMenu />
          <CookieNotice />
        </LanguageProvider>
      </body>
    </html>
  );
}
