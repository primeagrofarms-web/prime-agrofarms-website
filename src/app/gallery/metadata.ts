import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Photo Gallery - Prime Agro Farm Uganda Images & Videos',
  description: "View stunning photos and videos of Prime Agro Farm's facilities, dairy operations, cattle breeding, silage production, training workshops, and agro-tourism activities in Zirobwe, Luweero District, Uganda.",
  keywords: [
    'Prime Agro Farm photos',
    'Uganda farm gallery',
    'dairy farm pictures',
    'cattle breeding images',
    'agricultural facility photos',
    'farm tour pictures',
    'Zirobwe farm images',
    'Luweero agriculture photos',
  ],
  path: '/gallery',
});
