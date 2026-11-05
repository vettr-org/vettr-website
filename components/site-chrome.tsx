"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

const EMBED_ROUTES = new Set(["/privacy/embed", "/terms/embed"]);

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const embed = EMBED_ROUTES.has(pathname);

  return (
    <>
      {!embed && <SiteHeader />}
      {children}
    </>
  );
}
