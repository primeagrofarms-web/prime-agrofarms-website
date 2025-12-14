import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { SiteLayout } from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Prime Agro Farm - Uganda's Leading Integrated Dairy Company",
  description: "Modern agricultural innovation and sustainable farming practices in East Africa. Dairy farming, silage production, and training workshops in Zirobwe, Luweero District, Uganda.",
  keywords: "Prime Agro Farm, dairy farming Uganda, silage production, agricultural training, Luweero, sustainable farming, East Africa agriculture",
  openGraph: {
    title: "Prime Agro Farm - Uganda's Leading Integrated Dairy Company",
    description: "Modern agricultural innovation and sustainable farming practices in East Africa.",
    type: "website",
    locale: "en_UG",
    siteName: "Prime Agro Farm",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Agro Farm - Uganda's Leading Integrated Dairy Company",
    description: "Modern agricultural innovation and sustainable farming practices in East Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteLayout>{children}</SiteLayout>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}