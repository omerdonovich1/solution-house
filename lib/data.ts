/**
 * Single source of truth for page content — strictly typed.
 * All copy is Hebrew (RTL), professionally proofed.
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
    title: "מיפוי הכאב",
    description:
      "מקשיבים, מנתחים וממפים את הבעיה האמיתית. לא את הסימפטומים — את שורש הכאב שמונע מהעסק שלכם לצמוח.",
    insight: "רוב הפתרונות נכשלים כי הם פותרים את הבעיה הלא נכונה.",
  },
  {
    index: "02",
    title: "הגדרת יעדים",
    description:
      "מגדירים במדויק את המטרה: איך נראה פתרון שעובד? איך נמדוד הצלחה? זה המפתח להכול.",
    insight: "מי שלא יודע לאן הוא הולך — אף דרך לא תוביל אותו לשם.",
  },
  {
    index: "03",
    title: "פיתוח ממוקד",
    description:
      "בונים בדיוק את מה שצריך, בלי פיצ'רים מיותרים. המסלול הישיר ביותר לפתרון טכנולוגי שעובד.",
    insight: "פחות קוד מיותר, יותר תוצאות בשטח.",
  },
  {
    index: "04",
    title: "הוכחת ביצועים",
    description:
      "הפתרון עולה לאוויר — ואנחנו מודדים אותו. עובד? משדרגים. לא מדויק מספיק? מבצעים אופטימיזציה מהירה. בלי דעות אישיות, רק על בסיס נתונים.",
    insight: "התוצאה היא המדד האמיתי להצלחה.",
  },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "qc-system",
    name: "DYNAMICA QC",
    description:
      "מערכת בקרת איכות לרצפת ייצור. סריקת ברקוד בעמדות, ניהול NCR, השלמת הזמנות אוטומטית ודאשבורד ניהול בזמן אמת.",
    tags: ["מערכת", "Industry"],
    href: "/mockups/qc-system.html",
    image: "/proj-qc.png",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: "vanguard-fleet",
    name: "VANGUARD FLEET",
    description:
      "מערכת ניהול צי רכבים. הזמנות ותחזוקה, התראות טסט וביטוח, בוט WhatsApp לנהגים וסריקת מסמכים אוטומטית ב-AI.",
    tags: ["SaaS", "AI"],
    href: "/mockups/vanguard-fleet.html",
    image: "/proj-fleet.png",
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
  { href: "#projects", label: "פרויקטים" },
  { href: "#process", label: "איך זה עובד" },
  { href: "#contact", label: "צור קשר" },
] as const;
