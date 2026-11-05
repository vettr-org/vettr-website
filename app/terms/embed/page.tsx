import type { Metadata, Viewport } from "next";
import { LegalDocument } from "@/components/legal-document";
import { TermsContent } from "@/components/terms-content";

export const metadata: Metadata = {
  title: "Terms of use",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#e0e0d6" };

export default function TermsEmbedPage() {
  return (
    <LegalDocument title="WorkedWith Terms of Service" embed>
      <TermsContent />
    </LegalDocument>
  );
}
