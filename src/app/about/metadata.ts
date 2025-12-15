import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us - Prime Agro Farm Story & Leadership',
  description: "Learn about Prime Agro Farm's journey from 2012 to becoming Uganda's leading integrated dairy company. Meet our award-winning founder Sebastian Rutah Ngambwa and leadership team. Over 1 billion UGX investment in sustainable agriculture.",
  keywords: [
    'Prime Agro Farm history',
    'Sebastian Rutah Ngambwa',
    'Uganda best farmer',
    'agricultural leadership Uganda',
    'Prime Agro Farm team',
    'Zirobwe farm',
    'Luweero agriculture',
    'sustainable farming Uganda',
  ],
  path: '/about',
});
