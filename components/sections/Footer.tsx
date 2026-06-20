export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="shell flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <span className="font-mono text-xs tracking-[0.08em] text-steel">
          SOLUTION.HOUSE · פתרונות טכנולוגיים
        </span>
        <span className="font-mono text-xs tracking-[0.08em] text-steel">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
