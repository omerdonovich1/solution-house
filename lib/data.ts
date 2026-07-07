/**
 * Single source of truth for page content — strictly typed.
 * All copy is Hebrew (RTL), professionally proofed.
 */

import type { Bi } from "@/lib/i18n";

export interface ApproachColumn {
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly winner: boolean;
}

export interface ProcessStep {
  readonly index: string;
  readonly title: Bi;
  readonly description: Bi;
  readonly insight: Bi;
}

export type ProjectKind = "SaaS" | "E-commerce" | "Urban";

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly href: string;
  readonly image: string;
  readonly span: string;
}

export interface TeamMember {
  readonly num: string;
  readonly role: string;
  readonly tag: string;
  readonly value: string;
}

export const APPROACH: readonly ApproachColumn[] = [
  {
    label: "ספק טיפוסי",
    title: "מבצע הוראות",
    body: "אתם מבקשים פיצ'ר — הוא מפתח אותו, מבלי לשאול 'למה'. בסוף התהליך תקבלו בדיוק את מה שביקשתם, אך לא בהכרח את מה שהעסק שלכם באמת צריך.",
    winner: false,
  },
  {
    label: "אנחנו",
    title: "פותרים בעיות",
    body: "קודם כול מבינים את שורש הצורך שלכם. רק אז בונים את הפתרון המהיר, החכם והיעיל ביותר — כזה שפותר את הבעיה מהיסוד.",
    winner: true,
  },
] as const;

export const STEPS: readonly ProcessStep[] = [
  {
    index: "01",
    title: { he: "מבינים את הבעיה", en: "Understand the problem" },
    description: {
      he: "נפגשים, מקשיבים ושואלים את השאלות הנכונות. לא מחפשים סימפטומים — מחפשים את מה שבאמת עוצר אתכם.",
      en: "We meet, listen, and ask the right questions. Not chasing symptoms — finding what's really holding you back.",
    },
    insight: {
      he: "רוב הפרויקטים נכשלים כי פתרו את הבעיה הלא נכונה.",
      en: "Most projects fail because they solved the wrong problem.",
    },
  },
  {
    index: "02",
    title: { he: "מגדירים הצלחה", en: "Define success" },
    description: {
      he: "קובעים יחד מה נחשב הצלחה ואיך מודדים אותה — ככה שנינו יודעים בדיוק לאן הולכים, וכמה זה יעלה.",
      en: "Together we set what counts as success and how we measure it — so we both know exactly where we're headed, and what it costs.",
    },
    insight: {
      he: "מטרה ברורה חוסכת חודשים של פיתוח מיותר.",
      en: "A clear goal saves months of wasted development.",
    },
  },
  {
    index: "03",
    title: { he: "בונים בדיוק את מה שצריך", en: "Build exactly what's needed" },
    description: {
      he: "בלי פיצ'רים מיותרים ובלי הפתעות בדרך. אתם רואים התקדמות אמיתית כל שבוע — ויכולים לעצור בכל שלב.",
      en: "No needless features, no surprises along the way. You see real progress every week — and can stop at any stage.",
    },
    insight: {
      he: "פחות קוד, יותר תוצאות.",
      en: "Less code, more results.",
    },
  },
  {
    index: "04",
    title: { he: "מוכיחים שזה עובד", en: "Prove it works" },
    description: {
      he: "הפתרון באוויר ואנחנו מודדים: עובד? ממשיכים. צריך כיוון? מתקנים מהר. הנתונים מחליטים — לא האגו.",
      en: "The solution is live and we measure: working? We keep going. Needs adjusting? We fix it fast. The data decides — not the ego.",
    },
    insight: {
      he: "התוצאה בשטח היא המדד היחיד שמעניין.",
      en: "Real-world results are the only metric that matters.",
    },
  },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "qc-system",
    name: "DYNAMICA QC",
    description:
      "מערכת בקרת איכות לרצפת ייצור. סריקת ברקוד בעמדות, ניהול NCR, השלמת הזמנות אוטומטית ודאשבורד ניהול בזמן אמת.",
    tags: ["מערכת", "Industry"],
    href: "/mockups/shots/qc-real.jpg",
    image: "/mockups/shots/qc-real.jpg",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: "vanguard-fleet",
    name: "VANGUARD FLEET",
    description:
      "מערכת ניהול צי רכבים. הזמנות ותחזוקה, התראות טסט וביטוח, בוט WhatsApp לנהגים וסריקת מסמכים אוטומטית ב-AI.",
    tags: ["SaaS", "AI"],
    href: "/mockups/shots/fleet-real.jpg",
    image: "/mockups/shots/fleet-real.jpg",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: "carman",
    name: "CARMAN S",
    description:
      "מערכת SaaS לניהול צי רכבים. שליטה מלאה בשטח, מעקב אחר נהגים, ניהול תחזוקה והתראות תוקף רישיונות בזמן אמת.",
    tags: ["SaaS", "ניהול"],
    href: "https://carman-s.vercel.app",
    image: "/proj1.png",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "shadiez",
    name: "SHADIEZ",
    description:
      "מותג E-commerce. חוויית קנייה מהירה, נוחה ומוכוונת המרות, עטופה בעיצוב חכם ויוקרתי.",
    tags: ["E-commerce", "מותג"],
    href: "https://shadiez-seven.vercel.app",
    image: "/proj2.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: "spinz",
    name: "SPINZ",
    description:
      "מותג אופניים אורבניים. פלטפורמת אי-קומרס מתקדמת וייעודית לאופני סינגל-ספיד — תחנת הידע והרכישה המובילה בתחום.",
    tags: ["E-commerce", "Urban"],
    href: "https://www.spinzbikes.com",
    image: "/proj3.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
] as const;

export const TEAM: readonly TeamMember[] = [
  {
    num: "01",
    role: "אסטרטגיה",
    tag: "STRATEGY",
    value:
      "לומד את הביזנס שלכם לעומק ומגדיר את הכיוון הנכון. המוח העסקי שמאחורי הפרויקט.",
  },
  {
    num: "02",
    role: "ביצוע",
    tag: "EXECUTION",
    value:
      "לוקח את החזון ובונה את הפתרון — פותר כל אתגר טכני בדרך, ברמת דיוק מקסימלית.",
  },
  {
    num: "03",
    role: "דליוורי",
    tag: "DELIVERY",
    value:
      "מוודא שהכול עומד בסטנדרטים, משקף לכם תמיד את האמת — ודואג שתקבלו את הפתרון האיכותי ביותר.",
  },
] as const;

export const NAV_LINKS: readonly { href: string; label: string }[] = [
  { href: "#build", label: "מה אנחנו בונים" },
  { href: "#process", label: "איך זה עובד" },
  { href: "#contact", label: "צור קשר" },
] as const;
