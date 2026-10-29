import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Worked With — There’s a story behind every resumé.",
    template: "%s | Worked With",
  },
  description: "Worked With brings together honest perspectives from the people you’ve worked with. There’s a story behind every resumé.",
};

export const viewport: Viewport = { themeColor: "#1a1a1a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
