import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://prime-agrofarms.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  let newsRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const { data: news } = await supabase
      .from('news')
      .select('slug, updated_at')
      .order('published_date', { ascending: false });

    if (news) {
      newsRoutes = news.map((item) => ({
        url: `${BASE_URL}/news/${item.slug}`,
        lastModified: new Date(item.updated_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }

    const { data: blog } = await supabase
      .from('blog')
      .select('slug, updated_at')
      .order('published_date', { ascending: false });

    if (blog) {
      blogRoutes = blog.map((item) => ({
        url: `${BASE_URL}/blog/${item.slug}`,
        lastModified: new Date(item.updated_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return [...staticRoutes, ...newsRoutes, ...blogRoutes];
}
