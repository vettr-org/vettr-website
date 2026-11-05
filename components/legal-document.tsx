import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

export function LegalDocument({
  title,
  children,
  embed = false,
}: {
  title: string;
  children: ReactNode;
  embed?: boolean;
}) {
  return (
    <div className={`inner-page legal-page${embed ? " legal-embed" : ""}`}>
      <main className="legal-main" id="main" data-theme="light">
        <article className="legal-content">
          <h1>{title}</h1>
          <p className="legal-updated">Last Updated: [Date]</p>
          {children}
        </article>
      </main>
      {!embed && <SiteFooter inner light />}
    </div>
  );
}
