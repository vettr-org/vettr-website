"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Brand } from "./brand";

export function SiteHeader() {
  const pathname = usePathname();
  const navigation = useRef<HTMLElement>(null);
  const inner = pathname !== "/";
  const light = pathname === "/terms" || pathname === "/privacy";

  useEffect(() => {
    let frame = 0;
    let disposed = false;
    function update() {
      frame = 0;
      for (const item of navigation.current?.querySelectorAll<HTMLElement>("[data-nav-contrast]") ?? []) {
        const bounds = item.getBoundingClientRect();
        const x = Math.min(innerWidth - 1, Math.max(0, bounds.left + bounds.width / 2));
        const y = Math.min(innerHeight - 1, Math.max(0, bounds.top + bounds.height / 2));
        const background = document.elementsFromPoint(x, y)
          .filter(element => !element.closest(".site-header"))
          .map(element => element.closest<HTMLElement>("[data-theme]"))
          .find(Boolean);
        item.dataset.onLight = String(background?.dataset.theme === "light");
      }
    }
    function requestUpdate() {
      if (!disposed && !frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    document.fonts.ready.then(requestUpdate);
    requestUpdate();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="container nav-inner" aria-label="Main navigation" ref={navigation}>
          <Link href="/" aria-label="Worked With home" data-nav-contrast data-on-light={light}>
            <Brand />
          </Link>
          <Link className="nav-link" href={inner ? "/" : "/contact"} data-nav-contrast data-on-light={light}>
            {inner ? "Home" : "Contact"}
          </Link>
        </nav>
      </header>
    </>
  );
}
