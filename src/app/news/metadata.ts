import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Latest News & Updates - Prime Agro Farm Uganda',
  description: "Stay updated with the latest news, achievements, and developments from Prime Agro Farm. Read about our farming innovations, community initiatives, awards, and agricultural advancements in Uganda.",
  keywords: [
    'Prime Agro Farm news',
    'Uganda agriculture news',
    'dairy farming updates',
    'farm achievements Uganda',
    'agricultural innovation news',
    'farming awards Uganda',
    'Luweero farm news',
  ],
  path: '/news',
});
