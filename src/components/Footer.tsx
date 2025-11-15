const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* ASCII divider */}
        <div className="font-mono text-xs text-muted-foreground mb-6 overflow-x-auto">
          ─────────────────────────────────────────────────────────────────────
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-mono">© {currentYear}</span> Manpreet · Built
            with precision
          </div>

          <div className="text-sm text-muted-foreground font-mono">
            <span className="text-foreground">$</span> exit 0
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
