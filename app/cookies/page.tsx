"use client";

import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

const EMAIL = "info@solutionhouse.dev";

/**
 * Cookie policy — kept in strict sync with what the code actually stores.
 * Current inventory: the optional launch-gate cookie (sh_gate, only when the
 * private preview lock is enabled), and three localStorage keys (sh_lang,
 * sh_a11y, sh_cookie_ack). No analytics, marketing or third-party cookies.
 * If storage is ever added to the site, update this page in the same change.
 */

const SECTIONS: readonly LegalSection[] = [
  {
    heading: { he: "מה הן עוגיות ואחסון מקומי?", en: "What are cookies and local storage?" },
    body: [
      {
        he: `עוגיות (Cookies) הן קבצי טקסט קטנים שאתר שומר בדפדפן שלכם. בנוסף, דפדפנים מאפשרים "אחסון מקומי" (Local Storage) — מנגנון דומה לשמירת העדפות במכשיר שלכם. מדיניות זו מפרטת בשקיפות מלאה את כל מה שהאתר שלנו שומר בדפדפן, למה, ולכמה זמן — בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 (כולל תיקון 13) ולעקרונות ה-GDPR האירופי.`,
        en: `Cookies are small text files a website stores in your browser. Browsers also provide "Local Storage" — a similar mechanism for saving preferences on your device. This policy transparently lists everything our site stores in your browser, why, and for how long — in line with the Israeli Privacy Protection Law, 1981 (including Amendment 13) and the principles of the EU GDPR.`,
      },
    ],
  },
  {
    heading: { he: "העיקרון שלנו: מינימום הכרחי בלבד", en: "Our principle: the essential minimum only" },
    body: [
      {
        he: `האתר אינו משתמש בעוגיות מעקב, אנליטיקה, פרסום או צד שלישי — בכלל. איננו בונים פרופיל עליכם, איננו עוקבים אחריכם בין אתרים, ואיננו מעבירים מידע מהדפדפן שלכם לגורמי פרסום. כל מה שנשמר הוא פונקציונלי בלבד — נועד אך ורק כדי שהאתר יעבוד ויזכור את ההעדפות שבחרתם.`,
        en: `This site uses no tracking, analytics, advertising or third-party cookies — at all. We do not build a profile of you, do not follow you across websites, and do not pass anything from your browser to advertisers. Everything stored is strictly functional — it exists only so the site works and remembers the preferences you chose.`,
      },
      {
        he: `על פי הדין, אחסון פונקציונלי-חיוני מסוג זה אינו טעון הסכמה מוקדמת — אך אנו מיידעים עליו בשקיפות מלאה כאן ובהודעה שמוצגת בביקור הראשון.`,
        en: `Under applicable law, essential functional storage of this kind does not require prior consent — but we disclose it in full transparency here and in the notice shown on your first visit.`,
      },
    ],
  },
  {
    heading: { he: "מה בדיוק נשמר בדפדפן שלכם", en: "Exactly what is stored in your browser" },
    body: [
      {
        he: `אחסון מקומי (Local Storage) — נשאר עד שתמחקו אותו:`,
        en: `Local Storage — kept until you delete it:`,
      },
      [
        {
          he: `sh_lang — העדפת השפה שבחרתם (עברית או English), כדי שהאתר ייפתח בשפה הנכונה בביקור הבא.`,
          en: `sh_lang — your chosen language (Hebrew or English), so the site opens in the right language on your next visit.`,
        },
        {
          he: `sh_a11y — הגדרות הנגישות שבחרתם בתפריט הנגישות (גודל טקסט, ניגודיות, עצירת אנימציות וכו'), כדי שיישמרו בין ביקורים.`,
          en: `sh_a11y — the accessibility settings you chose in the accessibility menu (text size, contrast, stop animations, etc.), so they persist between visits.`,
        },
        {
          he: `sh_cookie_ack — סימון שקראתם את ההודעה על מדיניות זו, כדי שלא נציג אותה שוב בכל ביקור.`,
          en: `sh_cookie_ack — a flag noting you have seen the notice about this policy, so we don't show it again on every visit.`,
        },
      ],
      {
        he: `עוגייה (Cookie) — רק כאשר האתר נמצא במצב תצוגה מקדימה פרטית (נעילת קוד גישה), מצב שאינו פעיל בשגרה:`,
        en: `Cookie — only when the site is in private-preview mode (access-code lock), which is not normally active:`,
      },
      [
        {
          he: `sh_gate — עוגייה פונקציונלית המציינת שהזנתם קוד גישה נכון. תקפה ל-30 יום, מוגדרת כ-HttpOnly ו-Secure, ואינה מכילה מידע אישי.`,
          en: `sh_gate — a functional cookie noting that you entered a correct access code. Valid for 30 days, set as HttpOnly and Secure, and contains no personal information.`,
        },
      ],
      {
        he: `זה הכול. אין שום דבר נוסף — לא פיקסלים, לא טביעת אצבע דיגיטלית, ולא כלי מדידה של צד שלישי. הגופנים באתר מוגשים מהשרת שלנו (ולא מ-Google), כך שגם טעינתם אינה חושפת אתכם לגורם חיצוני.`,
        en: `That is everything. Nothing else — no pixels, no fingerprinting, no third-party measurement tools. The site's fonts are served from our own server (not from Google), so even font loading exposes you to no external party.`,
      },
    ],
  },
  {
    heading: { he: "איך מנהלים או מוחקים את זה", en: "How to manage or delete it" },
    body: [
      {
        he: `אתם שולטים באחסון הזה במלואו, דרך הגדרות הדפדפן:`,
        en: `You are in full control of this storage, via your browser settings:`,
      },
      [
        {
          he: `מחיקה — בכל דפדפן ניתן למחוק עוגיות ואחסון מקומי דרך הגדרות → פרטיות → ניקוי נתוני גלישה (Chrome/Edge), העדפות → פרטיות → ניהול נתוני אתרים (Safari), או הגדרות → פרטיות ואבטחה → עוגיות (Firefox).`,
          en: `Deleting — every browser lets you clear cookies and local storage via Settings → Privacy → Clear browsing data (Chrome/Edge), Preferences → Privacy → Manage Website Data (Safari), or Settings → Privacy & Security → Cookies (Firefox).`,
        },
        {
          he: `חסימה — ניתן להגדיר את הדפדפן לחסום עוגיות ואחסון מראש, באופן גורף או לאתר ספציפי.`,
          en: `Blocking — you can set your browser to refuse cookies and storage in advance, globally or per site.`,
        },
        {
          he: `גלישה פרטית — במצב גלישה פרטית/אנונימית, כל מה שנשמר נמחק אוטומטית בסגירת החלון.`,
          en: `Private browsing — in private/incognito mode, anything stored is automatically deleted when you close the window.`,
        },
      ],
      {
        he: `שימו לב: מחיקה או חסימה של האחסון לא תפגע בגלישה באתר — ההשפעה היחידה היא שהעדפות השפה והנגישות שלכם לא יישמרו, וההודעה על מדיניות זו תוצג שוב.`,
        en: `Note: deleting or blocking this storage will not break your browsing — the only effect is that your language and accessibility preferences won't be remembered, and the notice about this policy will appear again.`,
      },
    ],
  },
  {
    heading: { he: "שינויים במדיניות זו", en: "Changes to this policy" },
    body: [
      {
        he: `אם נוסיף בעתיד עוגיות או כלי מדידה כלשהם (למשל אנליטיקה), נעדכן מדיניות זו לפני כן, ובמידת הצורך על פי דין — נבקש את הסכמתכם המפורשת מראש באמצעות מנגנון הסכמה ייעודי. תאריך העדכון האחרון מופיע בראש העמוד.`,
        en: `If we ever add cookies or any measurement tools (e.g. analytics), we will update this policy beforehand and, where the law requires, ask for your explicit prior consent via a dedicated consent mechanism. The last-updated date appears at the top of this page.`,
      },
    ],
  },
  {
    heading: { he: "יצירת קשר", en: "Contact" },
    body: [
      {
        he: `לשאלות על מדיניות זו או על פרטיות באתר, ניתן לפנות אלינו בכתובת ${EMAIL} ונשיב בהקדם. מידע נוסף על האופן שבו אנו מטפלים במידע אישי מופיע במדיניות הפרטיות שלנו.`,
        en: `For questions about this policy or privacy on this site, contact us at ${EMAIL} and we'll respond promptly. More on how we handle personal information can be found in our Privacy Policy.`,
      },
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title={{ he: "מדיניות עוגיות", en: "Cookie Policy" }}
      updated={{
        he: "מדיניות זו עודכנה לאחרונה: יולי 2026",
        en: "This policy was last updated: July 2026",
      }}
      sections={SECTIONS}
    />
  );
}
