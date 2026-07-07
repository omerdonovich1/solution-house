"use client";

import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

const EMAIL = "info@solutionhouse.dev";

const SECTIONS: readonly LegalSection[] = [
  {
    heading: { he: "כללי", en: "General" },
    body: [
      {
        he: `תנאי שימוש אלה מסדירים את השימוש שלכם באתר Solution House. עצם הגלישה והשימוש באתר מהווים הסכמה מלאה לתנאים אלה. אם אינכם מסכימים להם, אנא הימנעו משימוש באתר.`,
        en: `These Terms of Use govern your use of the Solution House website. By browsing and using the site you fully agree to these terms. If you do not agree, please refrain from using the site.`,
      },
    ],
  },
  {
    heading: { he: "האתר מסופק כמות שהוא", en: "Site provided as-is" },
    body: [
      {
        he: `האתר והתכנים בו מסופקים "כמות שהם" (As-Is), ללא כל אחריות מפורשת או משתמעת. אנו עושים מאמץ לשמור על מידע מדויק ועדכני, אך איננו מתחייבים שהאתר יהיה זמין ברציפות או נקי מתקלות.`,
        en: `The site and its content are provided "as-is", without any warranty, express or implied. We make an effort to keep the information accurate and up to date, but we do not guarantee that the site will be continuously available or free of faults.`,
      },
    ],
  },
  {
    heading: { he: "קניין רוחני", en: "Intellectual property" },
    body: [
      {
        he: `כל הזכויות בתכני האתר — לרבות עיצוב, טקסטים, קוד, לוגו וסימני מסחר — שייכות ל-Solution House. אין להעתיק, לשכפל, להפיץ או לעשות שימוש מסחרי בתכנים ללא אישור מראש ובכתב.`,
        en: `All rights in the site's content — including design, text, code, logos and trademarks — belong to Solution House. You may not copy, reproduce, distribute or make commercial use of the content without prior written permission.`,
      },
    ],
  },
  {
    heading: { he: "שימוש הוגן", en: "Acceptable use" },
    body: [
      {
        he: `אתם מתחייבים שלא לעשות שימוש לרעה באתר, לרבות ניסיונות לפגוע בפעילותו, לגשת אליו ללא הרשאה, להעמיס עליו או להשתמש בו למטרות בלתי חוקיות.`,
        en: `You agree not to misuse the site, including attempts to disrupt its operation, access it without authorization, overload it, or use it for any unlawful purpose.`,
      },
    ],
  },
  {
    heading: { he: "הגבלת אחריות", en: "Limitation of liability" },
    body: [
      {
        he: `Solution House לא תישא באחריות לכל נזק ישיר, עקיף, מקרי או תוצאתי הנובע מהשימוש באתר או מהסתמכות על תכניו, במידה המרבית המותרת על פי דין.`,
        en: `Solution House shall not be liable for any direct, indirect, incidental or consequential damage arising from the use of the site or reliance on its content, to the fullest extent permitted by law.`,
      },
    ],
  },
  {
    heading: { he: "הדין החל", en: "Governing law" },
    body: [
      {
        he: `על תנאי שימוש אלה יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית בכל מחלוקת נתונה לבתי המשפט המוסמכים בישראל.`,
        en: `These terms are governed by the laws of the State of Israel, and the competent courts in Israel shall have exclusive jurisdiction over any dispute.`,
      },
    ],
  },
  {
    heading: { he: "יצירת קשר", en: "Contact" },
    body: [
      {
        he: `בכל שאלה בנוגע לתנאי השימוש ניתן לפנות אלינו בכתובת ${EMAIL}.`,
        en: `For any questions regarding these terms, you can reach us at ${EMAIL}.`,
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title={{ he: "תנאי שימוש", en: "Terms of Use" }}
      updated={{
        he: "עודכן לאחרונה: יולי 2026",
        en: "Last updated: July 2026",
      }}
      sections={SECTIONS}
    />
  );
}
