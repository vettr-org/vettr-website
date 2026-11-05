import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { TermsContent } from "@/components/terms-content";

export const metadata: Metadata = { title: "Terms of use" };

export default function LegalPage() {
  return (
    <LegalDocument title="WorkedWith Terms of Service">
      <TermsContent />
    </LegalDocument>
  );
}
