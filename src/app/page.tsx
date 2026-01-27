import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import VideoTourSection from "@/components/VideoTourSection";
import ServicesSection from "@/components/ServicesSection";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";
import { supabase } from "@/lib/supabase";

async function getNews() {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

export const revalidate = 60; // Revalidate every minute

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
