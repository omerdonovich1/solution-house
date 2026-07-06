const WHATSAPP = "972523794801";
const EMAIL = "hello@solution.house";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="shell flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <span className="font-mono text-xs tracking-[0.12em] text-mist">
          SOLUTION.HOUSE · פתרונות טכנולוגיים
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-mist">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-ivory"
          >
            וואטסאפ
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors duration-300 hover:text-ivory"
          >
            {EMAIL}
          </a>
        </div>

        <span className="font-mono text-xs tracking-[0.12em] text-mist">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
