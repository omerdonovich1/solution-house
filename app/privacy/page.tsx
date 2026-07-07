"use client";

import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

const EMAIL = "info@solutionhouse.dev";

const SECTIONS: readonly LegalSection[] = [
  {
    heading: { he: "מבוא", en: "Introduction" },
    body: [
      {
        he: `אנחנו ב-Solution House מכבדים את פרטיותכם ומחויבים להגן על המידע האישי שאתם משתפים איתנו. מדיניות זו מסבירה איזה מידע אנחנו אוספים, כיצד אנו משתמשים בו וכיצד אנו שומרים עליו. השימוש באתר מהווה הסכמה למדיניות זו.`,
        en: `At Solution House we respect your privacy and are committed to protecting the personal information you share with us. This policy explains what information we collect, how we use it, and how we safeguard it. Using this site constitutes agreement to this policy.`,
      },
    ],
  },
  {
    heading: { he: "איזה מידע אנחנו אוספים", en: "What information we collect" },
    body: [
      {
        he: `אנחנו אוספים רק את המידע שאתם בוחרים למסור לנו באופן יזום:`,
        en: `We collect only the information you actively choose to provide:`,
      },
      [
        {
          he: "טופס יצירת קשר — שם מלא, מספר טלפון, כתובת אימייל ותוכן ההודעה שאתם שולחים.",
          en: "Contact form — full name, phone number, email address and the message you send.",
        },
        {
          he: "צ'אט העוזר החכם — תוכן ההודעות שאתם כותבים לצ'אט כדי שנוכל להשיב לפנייתכם.",
          en: "AI assistant chat — the content of the messages you type into the chat so we can respond to your inquiry.",
        },
      ],
      {
        he: `איננו אוספים מידע רגיש ואיננו דורשים ממכם למסור פרטים שאינם נחוצים ליצירת קשר.`,
        en: `We do not collect sensitive data and do not require you to provide any details beyond what's needed to get in touch.`,
      },
    ],
  },
  {
    heading: { he: "למה אנחנו משתמשים במידע", en: "Why we use your information" },
    body: [
      {
        he: `המידע משמש אך ורק כדי לחזור אליכם, להבין את הצורך שלכם ולהשיב לפנייתכם. איננו משתמשים בו לכל מטרה אחרת.`,
        en: `Your information is used solely to get back to you, understand your needs and respond to your inquiry. We do not use it for any other purpose.`,
      },
    ],
  },
  {
    heading: { he: "אחסון ואבטחה", en: "Storage and security" },
    body: [
      {
        he: `המידע נשמר באופן מאובטח ומשמש רק לצורך יצירת קשר איתכם. אנו נוקטים באמצעים סבירים כדי להגן עליו מפני גישה בלתי מורשית.`,
        en: `Your information is stored securely and used only to contact you. We take reasonable measures to protect it against unauthorized access.`,
      },
      {
        he: `לעולם איננו מוכרים, משכירים או מעבירים את המידע שלכם לצדדים שלישיים למטרות שיווק.`,
        en: `We never sell, rent or share your information with third parties for marketing purposes.`,
      },
    ],
  },
  {
    heading: { he: "עוגיות (Cookies)", en: "Cookies" },
    body: [
      {
        he: `האתר עושה שימוש בעוגייה פונקציונלית אחת בלבד לצורך תפעול שער הכניסה לאתר. איננו משתמשים בעוגיות מעקב, אנליטיקה או פרסום.`,
        en: `The site uses only a single functional cookie required to operate the site's entry gate. We do not use tracking, analytics or advertising cookies.`,
      },
    ],
  },
  {
    heading: { he: "הזכויות שלכם", en: "Your rights" },
    body: [
      {
        he: `יש לכם זכות לעיין במידע שאנו מחזיקים עליכם, לתקן אותו או לבקש את מחיקתו. לכל בקשה בנושא, פנו אלינו בכתובת ${EMAIL} ונטפל בכך בהקדם.`,
        en: `You have the right to access the information we hold about you, correct it, or request its deletion. For any such request, contact us at ${EMAIL} and we'll handle it promptly.`,
      },
    ],
  },
  {
    heading: { he: "יצירת קשר", en: "Contact" },
    body: [
      {
        he: `בכל שאלה בנוגע למדיניות הפרטיות ניתן לפנות אלינו בכתובת ${EMAIL}.`,
        en: `For any questions regarding this privacy policy, you can reach us at ${EMAIL}.`,
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title={{ he: "מדיניות פרטיות", en: "Privacy Policy" }}
      updated={{
        he: "עודכן לאחרונה: יולי 2026",
        en: "Last updated: July 2026",
      }}
      sections={SECTIONS}
    />
  );
}
