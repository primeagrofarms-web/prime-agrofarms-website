import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Services - Dairy Farming, Silage Production & Agricultural Training',
  description: "Explore Prime Agro Farm's comprehensive services: automated dairy farming with 500+ cattle, quality silage & hay production, professional agricultural training workshops, cattle breeding programs, and agro-tourism experiences in Uganda.",
  keywords: [
    'dairy farming services Uganda',
    'silage production Uganda',
    'agricultural training workshops',
    'cattle breeding Uganda',
    'agro tourism Luweero',
    'farm tours Uganda',
    'dairy cattle breeding',
    'modern farming techniques',
    'farm training programs',
  ],
  path: '/services',
});
