import type { Metadata, Viewport } from "next";
import { LegalDocument } from "@/components/legal-document";
import { PrivacyContent } from "@/components/privacy-content";

export const metadata: Metadata = {
  title: "Privacy policy",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#e0e0d6" };

export default function PrivacyEmbedPage() {
  return (
    <LegalDocument title="WorkedWith Privacy Policy" embed>
      <PrivacyContent />
    </LegalDocument>
  );
}
