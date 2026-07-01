export function Footer() {
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="shell flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <span className="font-mono text-xs tracking-[0.12em] text-mist">
          SOLUTION.HOUSE · פתרונות טכנולוגיים
        </span>
        <span className="font-mono text-xs tracking-[0.12em] text-mist">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
