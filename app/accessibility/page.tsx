"use client";

import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

const EMAIL = "info@solutionhouse.dev";

const SECTIONS: readonly LegalSection[] = [
  {
    heading: { he: "המחויבות שלנו לנגישות", en: "Our commitment to accessibility" },
    body: [
      {
        he: `ב-Solution House אנו רואים חשיבות רבה בהנגשת האתר לכלל המשתמשים, לרבות אנשים עם מוגבלות. אנו פועלים כמיטב יכולתנו כדי שהאתר יעמוד בתקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.0 ברמת AA.`,
        en: `At Solution House we place great importance on making our site accessible to all users, including people with disabilities. We make a good-faith effort to have the site meet Israeli Standard IS 5568, based on the WCAG 2.0 guidelines at level AA.`,
      },
    ],
  },
  {
    heading: { he: "מה יישמנו באתר", en: "Features we've implemented" },
    body: [
      {
        he: `בין השאר, נקטנו באמצעים הבאים כדי לשפר את הנגישות:`,
        en: `Among other things, we have taken the following steps to improve accessibility:`,
      },
      [
        {
          he: "ניווט מלא באמצעות מקלדת בכל רכיבי האתר האינטראקטיביים.",
          en: "Full keyboard navigation across all interactive elements.",
        },
        {
          he: "מבנה HTML סמנטי ותקין לתמיכה בקוראי מסך.",
          en: "Semantic, valid HTML markup that supports screen readers.",
        },
        {
          he: "טקסט חלופי (alt) לתמונות ותוויות נגישות (aria) לכפתורים.",
          en: "Alternative text (alt) for images and accessible labels (aria) for controls.",
        },
        {
          he: "ניגודיות צבעים מספקת בין הטקסט לרקע.",
          en: "Sufficient color contrast between text and background.",
        },
        {
          he: "סימוני פוקוס ברורים בעת ניווט במקלדת.",
          en: "Clear focus indicators when navigating with the keyboard.",
        },
        {
          he: "עיצוב רספונסיבי המותאם למגוון מסכים ומכשירים.",
          en: "A responsive design adapted to a range of screens and devices.",
        },
      ],
    ],
  },
  {
    heading: { he: "מאמץ מתמשך", en: "An ongoing effort" },
    body: [
      {
        he: `הנגשת האתר היא תהליך מתמשך. אנו ממשיכים לשפר ולתקן, ועושים זאת במאמץ כן ובתום לב. ייתכן שחלקים מסוימים באתר טרם הונגשו במלואם — נשמח לדעת על כך ולתקן.`,
        en: `Accessibility is an ongoing process. We keep improving and fixing, and we do so as a sincere, good-faith effort. Some parts of the site may not yet be fully accessible — we'd be glad to hear about it and put it right.`,
      },
    ],
  },
  {
    heading: { he: "דיווח על בעיית נגישות", en: "Reporting an accessibility issue" },
    body: [
      {
        he: `נתקלתם בקושי בגלישה או בבעיית נגישות? נשמח שתפנו אלינו. רכז הנגישות שלנו זמין בכתובת ${EMAIL}, ואנו מתחייבים לבחון כל פנייה ולטפל בה בהקדם האפשרי.`,
        en: `Ran into a difficulty browsing or an accessibility issue? We'd love to hear from you. Our accessibility coordinator is available at ${EMAIL}, and we're committed to reviewing every request and addressing it as soon as possible.`,
      },
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title={{ he: "הצהרת נגישות", en: "Accessibility Statement" }}
      updated={{
        he: "הצהרה זו עודכנה לאחרונה: יולי 2026",
        en: "This statement was last updated: July 2026",
      }}
      sections={SECTIONS}
    />
  );
}
