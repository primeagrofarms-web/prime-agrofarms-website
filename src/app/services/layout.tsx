import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Agricultural Services | Dairy, Silage, Training & Cattle Breeding",
  description: "Explore our comprehensive agricultural services including modern dairy farming, high-quality silage production, professional training workshops, and superior cattle breeding in Uganda.",
  keywords: [
    "cattle breeding Uganda",
    "dairy farm services",
    "silage production Luweero",
    "agricultural workshops Uganda",
    "livestock genetics",
    "farm management training",
  ],
  path: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
