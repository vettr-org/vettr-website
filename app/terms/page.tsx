import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { TermsContent } from "@/components/terms-content";

export const metadata: Metadata = { title: "Terms of use" };

export default function LegalPage() {
 return (<div className="inner-page legal-page">
  <main className="legal-main" id="main" data-theme="light">
   <article className="legal-content"><h1>WorkedWith Terms of Service</h1><p className="legal-updated">Last Updated: [Date]</p>
   <TermsContent /></article>
  </main>
  <SiteFooter inner light />
 </div>);
}
