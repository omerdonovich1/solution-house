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
    label: "סטודיו רגיל",
    title: "בונים מה שביקשת",
    body: 'אתה אומר "אני רוצה אפליקציה" — ומקבל אפליקציה. גם אם לא היית באמת צריך אותה. מוכרים לך שעות פיתוח, לא תוצאות.',
    winner: false,
  },
  {
    label: "אנחנו",
    title: "בונים מה שיעבוד",
    body: 'אתה אומר "אני רוצה אפליקציה" — ואנחנו שואלים "מה הבעיה?". בוחרים את הפתרון הזול והמהיר ביותר שעובד. לפעמים זו אפליקציה. לפעמים משהו פשוט בהרבה שיחסוך לך זמן וכסף.',
    winner: true,
  },
] as const;

export const STEPS: readonly ProcessStep[] = [
  {
    index: "01",
    title: "פיצוח האתגר",
    description:
      "לפני שורת הקוד הראשונה אנחנו ממפים את הבעיה העסקית: יעדים, נקודות כאב והזדמנויות. כך כל החלטה טכנולוגית משרתת תוצאה מדידה — לא פיצ'ר מיותר.",
    insight: "רוב כשלי הפיתוח נולדים באפיון, לא בקוד. אנחנו סוגרים את הפער מראש.",
  },
  {
    index: "02",
    title: "הוכחת היתכנות",
    description:
      "פתרון ממוקד שעולה לאוויר במהירות, כדי שתראו ערך אמיתי בסיכון מינימלי — עוד לפני התחייבות להשקעה מלאה. למידה מהירה, החלטות חכמות.",
    insight: "איטרציה מהירה מקצרת את ה-Time-to-Value ומורידה את סיכון הפיתוח דרמטית.",
  },
  {
    index: "03",
    title: "הנדסה לקנה מידה",
    description:
      "פיתוח מקצה לקצה — ארכיטקטורה, אינטגרציות ועיצוב — שנבנה להחזיק ולגדול. מערכת שעובדת היום ומוכנה למחר, בלי חוב טכני שמאט אתכם.",
    insight: "ארכיטקטורה נכונה היום חוסכת חוב טכני יקר מחר. אנחנו בונים לעשור, לא לרבעון.",
  },
  {
    index: "04",
    title: "מנוע צמיחה",
    description:
      "ההשקה היא ההתחלה, לא הסוף. ליווי שוטף, אופטימיזציה ושיפורים שממשיכים להחזיר על ההשקעה — שותף טכנולוגי שתמיד בשליטה.",
    insight: "עיקר ערך המוצר נוצר אחרי ההשקה. אנחנו נשארים כדי לממש אותו.",
  },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "carman",
    name: "CARMAN S",
    description:
      "מערכת ניהול צי רכב — דאשבורד פיקוד חי, ניהול נהגים, התראות ותוקפי רישיונות בזמן אמת.",
    tags: ["SaaS", "דאשבורד"],
    href: "https://carman-s.vercel.app",
    image: "/proj1.png",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "shadiez",
    name: "SHADIEZ",
    description: "חנות אונליין לכיסאות חוף בעבודת יד מעץ ובד.",
    tags: ["E-commerce", "מותג"],
    href: "https://shadiez-seven.vercel.app",
    image: "/proj2.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: "spinz",
    name: "SPINZ",
    description: "אתר מסחר לאופני עיר single-speed — גלריית דגמים וחנות.",
    tags: ["E-commerce", "Urban"],
    href: "https://www.spinzbikes.com",
    image: "/proj3.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
] as const;

export const TEAM: readonly TeamMember[] = [
  {
    num: "01",
    role: "ארכיטקט",
    tag: "TECH · CORE",
    value:
      "בוחר את הטכנולוגיה הנכונה לבעיה שלך ובונה את הליבה. האדם שיודע בדיוק מה יעבוד ומה לא — כדי שלא תשלם על פתרונות מיותרים.",
  },
  {
    num: "02",
    role: "מוצר ו-UX",
    tag: "DESIGN · PRODUCT",
    value:
      "מתרגם את הבעיה לחוויה נוחה. ממשקים, זרימות עבודה ודאשבורדים שאתה והצוות שלך תרצו להשתמש בהם כל יום.",
  },
  {
    num: "03",
    role: "ניהול לקוח",
    tag: "PROJECT · DELIVERY",
    value:
      "איש הקשר שלך לאורך כל הדרך. שומר על לוחות זמנים, מעדכן אותך בכל צעד ודואג שתקבל בדיוק את מה שהובטח.",
  },
] as const;

export const NAV_LINKS: readonly { href: string; label: string }[] = [
  { href: "#approach", label: "הגישה" },
  { href: "#projects", label: "פרויקטים" },
  { href: "#process", label: "איך זה עובד" },
  { href: "#team", label: "צוות" },
  { href: "#contact", label: "צור קשר" },
] as const;
