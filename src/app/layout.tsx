import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { SiteLayout } from "@/components/SiteLayout";
import { defaultMetadata } from "@/lib/metadata";
import { organizationSchema, localBusinessSchema } from "@/lib/structured-data";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        <SiteLayout>{children}</SiteLayout>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}