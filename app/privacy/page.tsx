import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Privacy policy" };

export default function LegalPage() {
 return (<div className="inner-page legal-page">
  <main className="legal-main" id="main" data-theme="light">
   <article className="legal-content"><h1>WorkedWith Privacy Policy</h1><p className="legal-updated">Last Updated: [Date]</p>
   <div className="legal-body"><p>Privacy policy content will be added here.</p></div></article>
  </main>
  <SiteFooter inner light />
 </div>);
}
