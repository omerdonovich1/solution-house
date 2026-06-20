/**
 * Single source of truth for page content — strictly typed.
 * All copy is Hebrew (RTL). Replace project links/images before launch.
 */

export interface ApproachColumn {
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly winner: boolean;
}

export interface ProcessStep {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly insight: string;
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
    title: "מבצע הזמנות",
    body: "אתם מבקשים פיצ'ר – הם מפתחים פיצ'ר, מבלי לשאול 'למה'. בסוף התהליך אתם מקבלים בדיוק מה שביקשתם, אך לא בהכרח את מה שהעסק שלכם באמת צריך.",
    winner: false,
  },
  {
    label: "אנחנו",
    title: "פותרים בעיות",
    body: "אנחנו קודם כל מבינים את הכאב האמיתי שלכם. רק לאחר מכן, אנחנו בונים את הפתרון המהיר והיעיל ביותר כדי לפתור את הבעיה מהשורש.",
    winner: true,
  },
] as const;

export const STEPS: readonly ProcessStep[] = [
  {
    index: "01",
    title: "מיפוי הכאב",
    description:
      "אנחנו שומעים, מבינים, ומפות את הבעיה האמיתית. לא את מה שאתם חושבים שהבעיה, אלא את הכאב שבעצם מונע החלטות בעסק שלכם.",
    insight: "רוב הפתרונות נכשלים כי הם פותרים את הבעיה הלא נכונה.",
  },
  {
    index: "02",
    title: "הגדרת היעד",
    description:
      "אנחנו מגדירים בדיוק מה המטרה. מה הסימן שהפתרון עובד? איך אנחנו מודדים הצלחה? זה המפתח להכל.",
    insight: "אם אתה לא יודע לאן אתה הולך, כל הדרך היא לא נכונה.",
  },
  {
    index: "03",
    title: "פיתוח ממוקד",
    description:
      "אנחנו בונים בדיוק את מה שצריך. לא פיצ'ר נוסף, לא מה שנוח לנו. רק הדרך הישירה לפתרון שעובד.",
    insight: "פחות קוד, יותר תוצאה.",
  },
  {
    index: "04",
    title: "הוכחת ביצועים בשטח",
    description:
      "הפתרון חי. אנחנו מודדים. אם זה עובד, אנחנו משדרגים. אם לא, אנחנו משנים כיוון. בלי דיאלוג עם חברים בקפה – בלי דעות, רק נתונים.",
    insight: "התוצאה היא המדבר האמיתי.",
  },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "carman",
    name: "CARMAN S",
    description:
      "שליטה מלאה על הצי שלכם בשטח. עקבו אחרי כל נהג, בחזיקה, ותאריכים של רישיונות בזמן אמיתי.",
    tags: ["SaaS", "ניהול"],
    href: "https://carman-s.vercel.app",
    image: "/proj1.png",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "shadiez",
    name: "SHADIEZ",
    description: "חוויית קנייה מהירה, נוחה ומוכוונת המרות. כל פלטפורמה בעיצוב חכם.",
    tags: ["E-commerce", "מותג"],
    href: "https://shadiez-seven.vercel.app",
    image: "/proj2.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: "spinz",
    name: "SPINZ",
    description: "פיצוח פלטפורמת אי-קומרס מתקדמת לאופני סינגל-ספיד. תחנת הידע והקנייה.",
    tags: ["E-commerce", "Urban"],
    href: "https://www.spinzbikes.com",
    image: "/proj3.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
] as const;

export const TEAM: readonly TeamMember[] = [
  {
    num: "01",
    role: "אדם ראשון",
    tag: "STRATEGY",
    value:
      "מבין את הביזנס שלכם עמוק יותר ממה שאתם עצמכם מבינים. קובע את הכיוון. זה המוח של הפרויקט.",
  },
  {
    num: "02",
    role: "אדם שני",
    tag: "EXECUTION",
    value:
      "הוא הגדול שיודע לבנות. לוקח את החזון ופותר כל בעיה טכנית שבדרך. המידות שלו דיוק.",
  },
  {
    num: "03",
    role: "אדם שלישי",
    tag: "DELIVERY",
    value:
      "מוודא שהכל עומד בתוקף. הוא אומר לכם את האמת. כאשר משהו לא עובד, הוא זה שמגיד לכם קודם.",
  },
] as const;

export const NAV_LINKS: readonly { href: string; label: string }[] = [
  { href: "#approach", label: "הגישה" },
  { href: "#projects", label: "פרויקטים" },
  { href: "#process", label: "איך זה עובד" },
  { href: "#team", label: "צוות" },
  { href: "#contact", label: "צור קשר" },
] as const;
