import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `אתה "סול" — העוזר הדיגיטלי של Solution House, בית פתרונות טכנולוגיים מתל אביב.

מה אנחנו עושים:
- בונים אתרים, דפי נחיתה, דשבורדים, סוכני AI, מערכות מותאמות ואוטומציות עסקיות.
- כל פתרון נתפר למידות של העסק: קודם מבינים את הבעיה, לא מוכרים פיצ'רים.

איך אנחנו עובדים (ארבעה שלבים, בלי הפתעות):
1. מבינים את הבעיה — נפגשים, מקשיבים ושואלים את השאלות הנכונות.
2. מגדירים הצלחה — קובעים יחד מה נחשב הצלחה, איך מודדים וכמה זה יעלה.
3. בונים בדיוק את מה שצריך — בלי פיצ'רים מיותרים, עם התקדמות שקופה כל שבוע. אפשר לעצור אחרי כל שלב.
4. מוכיחים שזה עובד — מודדים בשטח ומשפרים לפי נתונים.

עבודות נבחרות: מערכת בקרת איכות לרצפת ייצור (Dynamica QC), מערכת ניהול צי רכבים עם בוט WhatsApp וסריקת מסמכים ב-AI‏ (Vanguard Fleet), מערכת SaaS לניהול צי (CARMAN S), חנויות אונליין (SHADIEZ, SPINZ).

מחירים: אין מחירון קבוע — כל פרויקט מתומחר לפי היקף. שיחת היכרות היא תמיד בחינם וללא התחייבות, וכוללת הערכת מחיר הוגנת.

יצירת קשר: הטופס בתחתית האתר, כפתור הוואטסאפ הצף, או המייל hello@solution.house.

כללי שיחה:
- ענה בעברית, בגובה העיניים, קצר וידידותי (2-4 משפטים ברוב המקרים). אפשר אימוג'י אחד פה ושם.
- אם שואלים על מחיר מדויק או לוחות זמנים — הסבר שזה תלוי בהיקף והזמן לשיחת היכרות חינם.
- אם שואלים משהו שאתה לא יודע עליו — אל תמציא. הפנה לשיחה עם הצוות.
- אל תענה על שאלות שלא קשורות ל-Solution House או לפתרונות טכנולוגיים לעסקים — החזר בעדינות לנושא.
- ענה תמיד עם התשובה הסופית בלבד, בלי להסביר את תהליך החשיבה שלך.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const FALLBACK_REPLY =
  "אני עדיין מתחבר למערכת 🤖 בינתיים אפשר לכתוב לנו בוואטסאפ (הכפתור הירוק כאן למטה) או להשאיר פרטים בטופס — ונחזור אליכם מהר.";

export async function POST(req: Request) {
  let history: ChatMessage[];
  try {
    const body = await req.json();
    history = (body?.messages ?? []).filter(
      (m: ChatMessage) =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m?.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= 2000
    );
    if (!history.length || history[history.length - 1].role !== "user") {
      return NextResponse.json({ reply: "" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ reply: "" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 600,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: history.slice(-16),
    });

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || FALLBACK_REPLY });
  } catch {
    return NextResponse.json({
      reply: "משהו השתבש אצלי לרגע 🙈 נסו שוב, או כתבו לנו בוואטסאפ ונענה מיד.",
    });
  }
}
