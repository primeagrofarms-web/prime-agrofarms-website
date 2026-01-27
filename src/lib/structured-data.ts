const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://prime-agrofarms.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Prime Agro Farm Limited',
  alternateName: ['Prime Agro Farm', 'Prime Agrofarms'],
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo/prime-logo.png`,
  description: "Uganda's leading integrated dairy company with modern agricultural innovation and sustainable farming practices in East Africa.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zirobwe Town Council',
    addressLocality: 'Luweero District',
    addressRegion: 'Central Region',
    addressCountry: 'UG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+256-700-000-000',
    contactType: 'Customer Service',
    areaServed: 'UG',
    availableLanguage: ['en', 'sw'],
  },
  sameAs: [
    'https://facebook.com/primeagrofarm',
    'https://twitter.com/primeagrofarm',
    'https://linkedin.com/company/primeagrofarm',
    'https://instagram.com/primeagrofarm',
  ],
  founder: {
    '@type': 'Person',
    name: 'Sebastian Rutah Ngambwa',
    jobTitle: 'Founder & CEO',
    award: "Uganda's Best Farmer 2025",
  },
  foundingDate: '2012',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 50,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Uganda',
  },
  knowsAbout: [
    'Dairy Farming',
    'Silage Production',
    'Agricultural Training',
    'Cattle Breeding',
    'Sustainable Agriculture',
    'Agro Tourism',
  ],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'Prime Agro Farm Limited',
  image: `${BASE_URL}/images/logo/prime-logo.png`,
  url: BASE_URL,
  telephone: '+256-700-000-000',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zirobwe Town Council',
    addressLocality: 'Luweero District',
    addressRegion: 'Central Region',
    postalCode: '',
    addressCountry: 'UG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 0.8,
    longitude: 32.5,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
};

export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || 'Prime Agro Farm',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Prime Agro Farm Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/prime-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    image: image || `${BASE_URL}/images/logo/prime-logo.png`,
    provider: {
      '@type': 'Organization',
      name: 'Prime Agro Farm Limited',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Uganda',
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
