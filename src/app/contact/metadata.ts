import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us - Prime Agro Farm Uganda',
  description: "Get in touch with Prime Agro Farm in Zirobwe, Luweero District, Uganda. Contact us for dairy products, training programs, farm visits, partnerships, or consultations. Available Monday-Saturday 8:00 AM - 6:00 PM.",
  keywords: [
    'contact Prime Agro Farm',
    'Prime Agro Farm location',
    'Zirobwe farm contact',
    'Uganda farm consultation',
    'dairy farm inquiry',
    'agricultural training booking',
    'farm visit Uganda',
  ],
  path: '/contact',
});
