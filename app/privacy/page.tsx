import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { PrivacyContent } from "@/components/privacy-content";

export const metadata: Metadata = { title: "Privacy policy" };

export default function LegalPage() {
  return (
    <LegalDocument title="WorkedWith Privacy Policy">
      <PrivacyContent />
    </LegalDocument>
  );
}
