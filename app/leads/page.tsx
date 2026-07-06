"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Zap,
  BarChart3,
  Target,
  Inbox,
  Bot,
  TrendingUp,
  Settings,
  Globe,
  Mail,
  MessageCircle,
  X,
  MoreVertical,
  Check,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── design tokens reused from the site ───────────────────────────────
   gold = dot #D9A13B · accents aqua/iris/rose · ink/surface/ivory/mist
   glass = .liquid-glass · Rubik (font-sans, inherited) · RTL             */

type Status = "hot" | "warm" | "cold";
type Source = "website" | "whatsapp" | "email";
type Tone = "aqua" | "iris" | "dot" | "rose" | "mist";

interface Lead {
  id: number;
  name: string;
  initials: string;
  role: string;
  phone: string;
  email: string;
  source: Source;
  score: number;
  status: Status;
  statusLabel: string;
  time: string;
  message: string;
  tags: { label: string; tone: Tone }[];
  agents: { scout: string; qualifier: string; scorer: string; router: string };
}

interface Agent {
  key: string;
  name: string;
  Icon: LucideIcon;
  tone: Tone;
  role: string;
  desc: string;
  lastAction: string;
}

const LEADS: Lead[] = [
  {
    id: 1,
    name: "דוד שטרן",
    initials: "דש",
    role: 'מנכ"ל, סטארטאפ טק',
    phone: "050-1234567",
    email: "david@startup.com",
    source: "website",
    score: 92,
    status: "hot",
    statusLabel: "חם",
    time: "לפני 12 דק׳",
    message:
      "צריך אתר + אוטומציות AI לחברה של 15 עובדים. תקציב פתוח, רוצה להתחיל השבוע.",
    tags: [
      { label: "אתר", tone: "aqua" },
      { label: "אוטומציה", tone: "iris" },
      { label: "15 עובדים", tone: "dot" },
    ],
    agents: {
      scout: "זיהה ליד איכותי — מילוי מלא בטופס עם פרטים ברורים.",
      qualifier: "תקציב פתוח, צורך ברור, חברה של 15 עובדים, רוצה להתחיל מיידית.",
      scorer: "ציון 92/100 — ליד מצוין עם כוונת רכישה גבוהה ותקציב מתאים.",
      router: "שלח התראה מיידית — ליד A-tier שדורש טיפול מיידי.",
    },
  },
  {
    id: 2,
    name: "רונית לוי",
    initials: "רל",
    role: "מנהלת שיווק, קליניקה",
    phone: "052-9876543",
    email: "ronit@clinic.co.il",
    source: "whatsapp",
    score: 74,
    status: "warm",
    statusLabel: "חמים",
    time: "לפני 45 דק׳",
    message: "מעוניינת בדף נחיתה לקמפיין חדש. יש לכם ניסיון עם קליניקות?",
    tags: [
      { label: "דף נחיתה", tone: "rose" },
      { label: "קמפיין", tone: "dot" },
    ],
    agents: {
      scout: "הודעה בוואטסאפ עסקי — פנייה מנומסת עם שאלות ספציפיות.",
      qualifier: "קליניקה קיימת, צורך בקמפיין שיווקי, שואלת על ניסיון בתחום.",
      scorer: "ציון 74/100 — פוטנציאל טוב, צריך מענה מקצועי על ניסיון בתחום.",
      router: "שלח למחלקת דפי נחיתה — התאמה לצוות השיווקי.",
    },
  },
  {
    id: 3,
    name: "אלכס כהן",
    initials: "אכ",
    role: "פרילנסר",
    phone: "054-5551212",
    email: "alex@gmail.com",
    source: "email",
    score: 35,
    status: "cold",
    statusLabel: "קר",
    time: "לפני 3 שע׳",
    message: "מחיר לבניית אתר פשוט? אין לי תקציב גבוה, מחפש משהו זול.",
    tags: [{ label: "שאלת מחיר", tone: "mist" }],
    agents: {
      scout: "מייל עם שאלת מחיר כללית — ללא פרטים על הפרויקט.",
      qualifier: 'פרילנסר בודד, תקציב נמוך, מחפש "משהו זול" — עדיפות נמוכה.',
      scorer: "ציון 35/100 — עדיפות נמוכה, מומלץ לשלוח חבילות מחיר אוטומטיות.",
      router: "הכנס לרשימת המתנה — שלח מייל אוטומטי עם חבילות מחיר.",
    },
  },
];

const AGENTS: Agent[] = [
  {
    key: "scout",
    name: "Scout",
    Icon: Search,
    tone: "aqua",
    role: "קליטת לידים",
    desc: "מנטר את כל ערוצי הכניסה — טופס אתר, מייל, וואטסאפ ולינקדאין. מחלץ נתונים, מאמת פרטי קשר ומכניס למערכת בזמן אמת.",
    lastAction: "קלט 3 לידים חדשים ב-12 השעות האחרונות.",
  },
  {
    key: "qualifier",
    name: "Qualifier",
    Icon: Zap,
    tone: "dot",
    role: "סינון איכות",
    desc: "בודק אם הליד רלוונטי: תקציב, צורך אמיתי, מיקום, גודל חברה וסמכות החלטה. מסנן רעש ושומר זמן יקר.",
    lastAction: "אישר 8 מתוך 12 לידים (67% אישור).",
  },
  {
    key: "scorer",
    name: "Scorer",
    Icon: BarChart3,
    tone: "rose",
    role: "דירוג ציון",
    desc: "נותן ציון 1–100 לכל ליד לפי היסטוריית המרות, התנהגות דיגיטלית, פרמטרים עסקיים וסיכוי סגירה חזוי.",
    lastAction: "3 לידים עם ציון 90+ השבוע — שיא חדש.",
  },
  {
    key: "router",
    name: "Router",
    Icon: Target,
    tone: "iris",
    role: "חלוקה לצוות",
    desc: "מחליט למי לשלוח כל ליד לפי עומס נוכחי, התמחות, זמינות והיסטוריית הצלחה. שולח התראות ותזכורות.",
    lastAction: "חילק 5 לידים היום — 2 לך, 3 לשותף.",
  },
];

const SOURCES: Record<Source, { Icon: LucideIcon; label: string; className: string }> = {
  website: { Icon: Globe, label: "מהאתר", className: "text-emerald-400" },
  whatsapp: { Icon: MessageCircle, label: "מוואטסאפ", className: "text-dot" },
  email: { Icon: Mail, label: "ממייל", className: "text-mist" },
};

const TONE: Record<Tone, string> = {
  aqua: "bg-aqua/10 text-aqua",
  iris: "bg-iris/10 text-iris",
  dot: "bg-dot/10 text-dot",
  rose: "bg-rose/10 text-rose",
  mist: "bg-white/[0.06] text-mist",
};

const TEXT_TONE: Record<Tone, string> = {
  aqua: "text-aqua",
  iris: "text-iris",
  dot: "text-dot",
  rose: "text-rose",
  mist: "text-ivory",
};

const STATUS: Record<Status, { border: string; avatar: string; accent: string }> = {
  hot: { border: "border-r-rose", avatar: "from-rose to-[#ff5f57] text-ink", accent: "text-rose" },
  warm: { border: "border-r-dot", avatar: "from-dot to-[#b8842f] text-ink", accent: "text-dot" },
  cold: { border: "border-r-white/12", avatar: "from-elevated to-surface text-mist", accent: "text-mist" },
};

const scoreColor = (s: number) => (s >= 80 ? "text-rose" : s >= 60 ? "text-dot" : "text-mist");

/* ── modal (bottom sheet) ────────────────────────────────────────────── */
type ModalState =
  | { kind: "lead"; id: number }
  | { kind: "agent"; key: string }
  | { kind: "agents" }
  | { kind: "filter" }
  | null;

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
      <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dot">
        {title}
      </div>
      <div className="text-[13.5px] leading-relaxed text-body">{children}</div>
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────────────── */
export default function LeadManager() {
  const [taken, setTaken] = useState<Set<number>>(new Set());
  const [modal, setModal] = useState<ModalState>(null);
  const [tab, setTab] = useState("leads");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [toast, setToast] = useState<{ text: string; n: number }>({ text: "", n: 0 });
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = (text: string) =>
    setToast((t) => ({ text, n: t.n + 1 }));

  useEffect(() => {
    if (!toast.n) return;
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, text: "" })), 3000);
    return () => clearTimeout(toastTimer.current);
  }, [toast.n]);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  const takeLead = (lead: Lead) => {
    setTaken((s) => new Set(s).add(lead.id));
    showToast("הליד נלקח בהצלחה");
  };

  const stats = [
    { value: 12, label: "חדשים", gold: false },
    { value: 8, label: "בטיפול", gold: false },
    { value: 3, label: "חמים", gold: true },
  ];

  const NAV = [
    { id: "leads", Icon: Inbox, label: "לידים" },
    { id: "agents", Icon: Bot, label: "סוכנים" },
    { id: "stats", Icon: TrendingUp, label: "סטטיסטיקה" },
    { id: "settings", Icon: Settings, label: "הגדרות" },
  ];

  const visibleLeads = LEADS.filter((l) => filter === "all" || l.status === filter);

  return (
    <div className="relative z-[1] min-h-svh">
      <div className="mx-auto max-w-[480px] lg:flex lg:max-w-[1200px] lg:items-start lg:gap-6 lg:px-8 lg:py-8">
        {/* ── desktop sidebar (RTL → right) ── */}
        <aside className="hidden lg:block lg:w-[240px] lg:shrink-0">
          <div className="liquid-glass sticky top-8 rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-dot to-[#b8842f] shadow-[0_8px_24px_-6px_rgba(217,161,59,0.5)]">
                <LogoMark className="h-6 w-6 text-ink" />
              </span>
              <div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-dot">
                  Solution House
                </div>
                <div className="text-[17px] font-black tracking-tightest text-ivory">Lead Manager</div>
              </div>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map((n) => {
                const active = tab === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => {
                      setTab(n.id);
                      if (n.id !== "leads") showToast(`${n.label} — בקרוב`);
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-bold transition-colors",
                      active ? "bg-dot/10 text-dot" : "text-mist hover:bg-white/[0.04] hover:text-ivory"
                    )}
                  >
                    <n.Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                    {n.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── main ── */}
        <main className="min-w-0 pb-[96px] lg:flex-1 lg:pb-0">
      {/* ── header ── */}
      <header className="liquid-glass relative overflow-hidden rounded-b-3xl px-6 pb-7 pt-8 lg:rounded-3xl">
        <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(217,161,59,0.18),transparent_65%)]" />
        <div className="relative flex items-center gap-4 lg:hidden">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-dot to-[#b8842f] shadow-[0_8px_24px_-6px_rgba(217,161,59,0.5)]">
            <LogoMark className="h-7 w-7 text-ink" />
          </span>
          <div className="flex-1">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-dot">
              Solution House
            </div>
            <div className="mt-0.5 text-2xl font-black tracking-tightest text-ivory">
              Lead Manager
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex gap-2.5 lg:mt-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex-1 rounded-2xl border border-white/[0.06] bg-ink/40 py-4 text-center backdrop-blur"
            >
              <div className={cn("text-[26px] font-black leading-none", s.gold ? "text-dot" : "text-ivory")}>
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] font-semibold tracking-wide text-mist">{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* ── AI agents ── */}
      <div className="flex items-center justify-between px-6 pb-3.5 pt-7 lg:px-0">
        <div className="flex items-center gap-2.5 text-[13px] font-extrabold text-body">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          סוכני AI פעילים
        </div>
        <button
          onClick={() => setModal({ kind: "agents" })}
          className="rounded-lg px-2 py-1 text-[11px] font-bold text-dot transition-colors hover:bg-dot/10"
        >
          הכל ‹
        </button>
      </div>

      <div className="scrollbar-hide flex gap-2.5 overflow-x-auto px-6 pb-1 lg:px-0">
        {AGENTS.map((a) => (
          <button
            key={a.key}
            onClick={() => setModal({ kind: "agent", key: a.key })}
            className="liquid-glass group min-w-[124px] shrink-0 rounded-2xl p-4 text-start transition-transform duration-300 hover:-translate-y-1"
          >
            <span className={cn("grid h-9 w-9 place-items-center rounded-xl", TONE[a.tone])}>
              <a.Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <div className="mt-3 text-[13px] font-extrabold text-ivory">{a.name}</div>
            <div className="mt-0.5 text-[10px] text-mist">{a.role}</div>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              פעיל
            </div>
          </button>
        ))}
      </div>

      {/* ── leads ── */}
      <div className="flex items-center justify-between px-6 pb-3.5 pt-7 lg:px-0">
        <div className="text-[13px] font-extrabold text-body">לידים אחרונים</div>
        <button
          onClick={() => setModal({ kind: "filter" })}
          className="rounded-lg px-2 py-1 text-[11px] font-bold text-dot transition-colors hover:bg-dot/10"
        >
          סינון ‹
        </button>
      </div>

      <div className="space-y-3.5 px-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0 lg:px-0 xl:grid-cols-3">
        {visibleLeads.map((lead, i) => {
          const st = STATUS[lead.status];
          const src = SOURCES[lead.source];
          const isTaken = taken.has(lead.id);
          return (
            <motion.article
              key={lead.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isTaken ? 0.5 : 1, y: 0, scale: isTaken ? 0.98 : 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className={cn(
                "liquid-glass relative overflow-hidden rounded-2xl border-r-[3px] p-5",
                st.border
              )}
            >
              {lead.status === "hot" && (
                <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl bg-gradient-to-l from-rose to-[#e0555f] px-3 py-1.5 text-[10px] font-black text-ink">
                  <Flame className="h-3 w-3" strokeWidth={2.4} />
                  חם · {lead.score}
                </div>
              )}

              <div className={cn("flex items-center gap-3.5", lead.status === "hot" && "mt-3")}>
                <span
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-[15px] font-black",
                    st.avatar,
                    lead.status === "cold" && "border border-white/[0.06]"
                  )}
                >
                  {lead.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold text-ivory">{lead.name}</div>
                  <div className="mt-0.5 truncate text-[11px] text-mist">{lead.role}</div>
                </div>
                <div className="shrink-0 text-end">
                  <div className="text-[10px] text-mist">{lead.time}</div>
                  <div className={cn("mt-1 flex items-center justify-end gap-1 text-[10px] font-bold", src.className)}>
                    <src.Icon className="h-3 w-3" strokeWidth={2} />
                    {src.label}
                  </div>
                </div>
              </div>

              <p className="mt-3.5 rounded-xl border border-white/[0.05] bg-ink/40 px-3.5 py-3 text-[12.5px] leading-relaxed text-body">
                {lead.message}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {lead.tags.map((t) => (
                  <span key={t.label} className={cn("rounded-lg px-2.5 py-1 text-[10px] font-bold", TONE[t.tone])}>
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => takeLead(lead)}
                  disabled={isTaken}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-[12.5px] font-extrabold transition-all duration-300",
                    isTaken
                      ? "bg-emerald-500/90 text-white"
                      : lead.status === "hot"
                      ? "bg-gradient-to-l from-dot to-[#b8842f] text-ink hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(217,161,59,0.6)]"
                      : "border border-dot/50 text-dot hover:bg-dot/10"
                  )}
                >
                  {isTaken ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={3} /> נלקח
                    </>
                  ) : (
                    "קח ליד"
                  )}
                </button>
                <button
                  onClick={() => setModal({ kind: "lead", id: lead.id })}
                  aria-label="פרטים"
                  className="grid w-11 place-items-center rounded-xl border border-white/[0.06] bg-surface text-mist transition-colors hover:border-dot/50 hover:text-dot"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
        </main>
      </div>

      {/* ── bottom nav — mobile only ── */}
      <nav className="liquid-glass fixed bottom-0 left-1/2 z-[100] flex w-full max-w-[480px] -translate-x-1/2 justify-around rounded-none border-x-0 border-b-0 px-2 pb-[calc(14px+env(safe-area-inset-bottom))] pt-2.5 lg:hidden">
        {NAV.map((n) => {
          const active = tab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => {
                setTab(n.id);
                if (n.id !== "leads") showToast(`${n.label} — בקרוב`);
              }}
              className="flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 transition-colors"
            >
              <n.Icon
                className={cn("h-[21px] w-[21px] transition-colors", active ? "text-dot" : "text-mist")}
                strokeWidth={1.9}
              />
              <span className={cn("text-[9px] font-bold tracking-wide", active ? "text-dot" : "text-mist")}>
                {n.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass max-h-[85vh] w-full max-w-[480px] overflow-y-auto rounded-t-3xl !bg-surface/95 px-6 pb-[calc(28px+env(safe-area-inset-bottom))] pt-6"
            >
              <ModalContent modal={modal} onNavigate={setModal} onFilter={(f) => { setFilter(f); setModal(null); }} onClose={() => setModal(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── toast ── */}
      <AnimatePresence>
        {toast.text && (
          <motion.div
            key={toast.n}
            initial={{ y: -80, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -80, opacity: 0, x: "-50%" }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="liquid-glass fixed left-1/2 top-5 z-[300] flex items-center gap-2.5 rounded-2xl px-5 py-3.5"
          >
            <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
            <span className="whitespace-nowrap text-[13px] font-bold text-ivory">{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── modal body ──────────────────────────────────────────────────────── */
function ModalContent({
  modal,
  onNavigate,
  onFilter,
  onClose,
}: {
  modal: NonNullable<ModalState>;
  onNavigate: (m: ModalState) => void;
  onFilter: (f: Status | "all") => void;
  onClose: () => void;
}) {
  let title = "";
  let body: React.ReactNode = null;

  if (modal.kind === "lead") {
    const lead = LEADS.find((l) => l.id === modal.id)!;
    title = lead.name;
    body = (
      <div className="space-y-4">
        <ModalSection title="פרטי קשר">
          <div className="space-y-1.5">
            <div>{lead.email}</div>
            <div dir="ltr" className="text-start">{lead.phone}</div>
            <div>{lead.role}</div>
          </div>
        </ModalSection>
        <ModalSection title="מקור וציון">
          מקור: {SOURCES[lead.source].label}
          <br />
          ציון: <span className={cn("text-lg font-black", scoreColor(lead.score))}>{lead.score}/100</span>
          <br />
          סטטוס: {lead.statusLabel}
        </ModalSection>
        <ModalSection title="פעולות הסוכנים">
          <div className="space-y-3">
            {AGENTS.map((a) => (
              <div key={a.key}>
                <span className={cn("font-bold", TEXT_TONE[a.tone])}>{a.name}:</span>{" "}
                {lead.agents[a.key as keyof Lead["agents"]]}
              </div>
            ))}
          </div>
        </ModalSection>
      </div>
    );
  } else if (modal.kind === "agent") {
    const a = AGENTS.find((x) => x.key === modal.key)!;
    title = a.name;
    body = (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={cn("grid h-11 w-11 place-items-center rounded-xl", TONE[a.tone])}>
            <a.Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div className="text-[13px] text-mist">{a.role}</div>
        </div>
        <ModalSection title="תיאור">{a.desc}</ModalSection>
        <ModalSection title="סטטוס">
          <span className="font-bold text-emerald-400">● פעיל</span>
          <br />
          <br />
          <span className="font-semibold text-ivory">פעולה אחרונה:</span>
          <br />
          {a.lastAction}
        </ModalSection>
      </div>
    );
  } else if (modal.kind === "agents") {
    title = "סוכני AI";
    body = (
      <div className="space-y-3">
        {AGENTS.map((a) => (
          <button
            key={a.key}
            onClick={() => onNavigate({ kind: "agent", key: a.key })}
            className="flex w-full items-start gap-3 rounded-2xl border border-white/[0.06] bg-ink/30 p-4 text-start transition-colors hover:border-dot/30"
          >
            <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", TONE[a.tone])}>
              <a.Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <div className="text-[14px] font-extrabold text-ivory">{a.name}</div>
              <div className="text-[11px] text-mist">{a.role}</div>
              <div className="mt-1.5 text-[12px] leading-relaxed text-body">{a.desc}</div>
            </div>
          </button>
        ))}
      </div>
    );
  } else {
    title = "סינון לידים";
    const opts: { f: Status | "all"; label: string; className: string }[] = [
      { f: "hot", label: "חמים (80+ ציון)", className: "text-rose" },
      { f: "warm", label: "חמימים (60–79)", className: "text-dot" },
      { f: "cold", label: "קרים (מתחת ל-60)", className: "text-mist" },
      { f: "all", label: "הצג הכל", className: "text-ivory" },
    ];
    body = (
      <div className="space-y-2.5">
        {opts.map((o) => (
          <button
            key={o.f}
            onClick={() => onFilter(o.f)}
            className={cn(
              "w-full rounded-2xl border border-white/[0.06] bg-ink/30 px-4 py-3.5 text-start text-[14px] font-bold transition-colors hover:border-dot/30",
              o.className
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div className="text-lg font-black tracking-tight text-ivory">{title}</div>
        <button
          onClick={onClose}
          aria-label="סגירה"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.06] bg-ink/40 text-mist transition-colors hover:border-dot/50 hover:text-dot"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {body}
    </>
  );
}
