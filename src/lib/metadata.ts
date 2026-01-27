import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://prime-agrofarms.com';
const SITE_NAME = 'Prime Agro Farm';
const DEFAULT_IMAGE = `${BASE_URL}/images/logo/prime-logo.png`;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} - Uganda's Leading Integrated Dairy Company`,
    template: `%s | ${SITE_NAME}`,
  },
    description: "Modern agricultural innovation and sustainable farming practices in East Africa. Specializing in dairy farming, silage production, cattle breeding, and agricultural training in Zirobwe, Uganda.",
  keywords: [
    "Prime Agro Farm",
    "dairy farming Uganda",
    "silage production",
    "agricultural training",
    "Luweero",
    "sustainable farming",
    "East Africa agriculture",
    "cattle breeding",
    "agro tourism",
    "farm tours Uganda",
    "best farmer Uganda",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/logo/prime-logo.png',
    apple: '/images/logo/prime-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Uganda's Leading Integrated Dairy Company`,
    description: "Modern agricultural innovation and sustainable farming practices in East Africa.",
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Uganda's Leading Integrated Dairy Company`,
    description: "Modern agricultural innovation and sustainable farming practices in East Africa.",
    images: [DEFAULT_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  path = '',
  type = 'website',
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const imageUrl = image || DEFAULT_IMAGE;

  return {
    title,
    description,
    keywords: keywords || defaultMetadata.keywords,
    openGraph: {
      type,
      locale: 'en_UG',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateArticleMetadata({
  title,
  description,
  image,
  slug,
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: {
  title: string;
  description: string;
  image: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}): Metadata {
  const url = `${BASE_URL}/${slug}`;

  return {
    title,
    description,
    keywords: tags,
    authors: authors?.map(name => ({ name })),
    openGraph: {
      type: 'article',
      locale: 'en_UG',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: authors,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}