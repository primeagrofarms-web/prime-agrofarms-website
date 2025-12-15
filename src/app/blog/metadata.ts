import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Farm Blog - Agricultural Tips & Insights from Prime Agro Farm',
  description: "Explore expert agricultural insights, farming techniques, dairy management tips, and sustainable farming practices from Prime Agro Farm's experienced team. Learn modern farming methods and agricultural best practices.",
  keywords: [
    'agricultural blog Uganda',
    'dairy farming tips',
    'farming techniques',
    'sustainable agriculture blog',
    'cattle management tips',
    'farm management Uganda',
    'agricultural best practices',
    'modern farming methods',
  ],
  path: '/blog',
});
