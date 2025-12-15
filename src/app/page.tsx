import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import VideoTourSection from "@/components/VideoTourSection";
import ServicesSection from "@/components/ServicesSection";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";

async function getNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news?limit=3`, { 
      cache: 'no-store',
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

export default async function HomePage() {
  const news = await getNews();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <VideoTourSection />
      <ServicesSection />
      <Suspense fallback={<div className="section-padding bg-secondary" />}>
        <NewsSection news={news} />
      </Suspense>
      <CTASection />
    </>
  );
}
