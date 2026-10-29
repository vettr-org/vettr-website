import Link from "next/link";
import { Brand } from "./brand";

export function SiteFooter({ inner = false, light = false }: { inner?: boolean; light?: boolean }) {
  return (
    <footer className="site-footer" data-theme={light ? "light" : "dark"}>
      <div className="footer-inner">
        <Link href="/" aria-label="Worked With home"><Brand /></Link>
        <p className="footer-tagline">There’s a story behind every resumé.</p>
        <div className="footer-divider" />
        <nav className="footer-links" aria-label="Footer navigation">
          {inner && <Link href="/">Home</Link>}
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of use</Link>
          {!inner && <Link href="/contact">Contact</Link>}
        </nav>
        <p className="copyright">© 2026 Worked With</p>
      </div>
    </footer>
  );
}
