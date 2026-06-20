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
  /** repo-relative screenshot, falls back to a labelled placeholder */
  readonly image: string;
  /** bento span: which cells this card occupies on the lg grid */
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
    title: "הם מקיימים את ההזמנה",
    body: 'אתה אומר "אני צריך מערכת לנהל את הצוות". הם בונים מערכת לנהל את הצוות. גם אם זה לא הפתרון שחוסך לך שעות. הם מוכרים שעות עבודה. אתה משלם על שעות.',
    winner: false,
  },
  {
    label: "אנחנו",
    title: "אנחנו פותרים את הבעיה",
    body: 'אתה אומר "צוות שלי בוזבז שעות על משהו שאני לא בטוח שצריך". אנחנו שואלים "בדיוק מה? איפה בזבוז הזמן?". בוחרים את הדרך הישירה — לפעמים מערכת, לפעמים אוטומציה, לפעמים רק שיפור בתהליך. תמיד מה שחוסך לך שעות ודחוף.',
    winner: true,
  },
] as const;

export const STEPS: readonly ProcessStep[] = [
  {
    index: "01",
    title: "הבנת הבעיה",
    description:
      "אנחנו שמים חצי מהזמן בשיחות עם הצוות שלך. מה בדיוק מונע? איפה בזבוז הזמן? מה הצוק? כל החלטה שאנחנו נעשה אחר כך משדרגת משהו שחשוב — לא משהו שחשבנו שזה טוב.",
    insight: "רוב הכשלים בפתרונות מתחילים בכאן — אנשים בונים למה שהם חשבו הבעיה, לא לבעיה של המשפיעים. אנחנו לא עושים את זה.",
  },
  {
    index: "02",
    title: "הוכחה בשטח",
    description:
      "במהירות, עם הנתונים שלך, בונים משהו שמראה אם הכיוון נכון. אתה רואה את הערך — או שלא. קודם הכל מבינים אם זה כדאי. אחרי זה מתחייבים להשקעה גדולה.",
    insight: "אתה מחזיק בסיכון. לא אנחנו. בימים הראשונים אתה יודע אם זה יעבוד או צריך לשנות כיוון — אז אתה מחליט.",
  },
  {
    index: "03",
    title: "שם זה עובד",
    description:
      "בנייה של הפתרון המלא — קל להשתמש, קל לשנות, קל לגדול איתו. לא משהו שיפסיק לעבוד כשתוסיף עוד נתונים או יותר אנשים. בלי תאונות טכניות שיגנבו מך זמן בחודשים הבאים.",
    insight: "הבניה הנכונה היום חוסכת לך הרבה שעות בעתיד. בונים בעיניים על הטווח ארוך, לא על התאריך ההשקה.",
  },
  {
    index: "04",
    title: "עד שזה משתלם",
    description:
      "אחרי שהדברים חיים, זה כשהערך בא. שיפורים קטנים, דוקדוקים, שיפרונים — הכל כדי שהפתרון יהיה עובד יותר ויותר טוב. אנחנו נשארים בצד.",
    insight: "כל הערך הרציני מגיע בשלושת החודשים שאחרי ההשקה. אנחנו נשארים כדי למקסום אותו — לא עוזבים אחרי החתימה.",
  },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "carman",
    name: "CARMAN S",
    description:
      "צי שלך בשטח יותר בשליטה. עקוב אחרי כל נהג, בחזיקה, ותאריכים של רישיונות בזמן אמיתי. פחות כתיבה על דוחות, יותר זמן על אסטרטגיה.",
    tags: ["SaaS", "ניהול"],
    href: "https://carman-s.vercel.app",
    image: "/proj1.png",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "shadiez",
    name: "SHADIEZ",
    description: "שדרוג מצילומים לחנות. אנשים רוצים לקנות — בנינו להם דרך קלה לעשות את זה באונליין.",
    tags: ["E-commerce", "מותג"],
    href: "https://shadiez-seven.vercel.app",
    image: "/proj2.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: "spinz",
    name: "SPINZ",
    description: "אנשים אוהבים אופניים. בנינו להם דרך לגלות דגמים, להשוות ולקנות בקלות.",
    tags: ["E-commerce", "Urban"],
    href: "https://www.spinzbikes.com",
    image: "/proj3.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
] as const;

export const TEAM: readonly TeamMember[] = [
  {
    num: "01",
    role: "בוחר בכלים נכונים",
    tag: "STRATEGY · CORE",
    value:
      "יודע בדיוק מה צריך — זה משהו קיים שמצטיין, או משהו חדש? זה קונפיג או קוד? בוחרים בכל פעם את הדבר הכי פשוט שיעבוד. היתרון שלך — אתה לא משלם על דברים שלא צריכים.",
  },
  {
    num: "02",
    role: "כך שאתה רוצה להשתמש בזה",
    tag: "DESIGN · PRODUCT",
    value:
      "הופך את הפתרון לאיזה שאתה ודעות שלך תרצו להשתמש בו כל יום. לא פשוט יעבוד — גם יהיה נחמד לעבודה איתו.",
  },
  {
    num: "03",
    role: "בעל הפרויקט",
    tag: "DELIVERY · TRUST",
    value:
      "בא לישיבות שלך, יודע מה קרה בשבועות הקודמים, מדבר בשפה שאתה מבין. הוא זה שמבטיח שאתה מקבל בדיוק מה הבטחנו.",
  },
] as const;

export const NAV_LINKS: readonly { href: string; label: string }[] = [
  { href: "#approach", label: "הגישה" },
  { href: "#projects", label: "פרויקטים" },
  { href: "#process", label: "איך זה עובד" },
  { href: "#team", label: "צוות" },
  { href: "#contact", label: "צור קשר" },
] as const;
