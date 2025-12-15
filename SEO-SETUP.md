# SEO Configuration Guide - Prime Agro Farm

This document outlines the SEO optimizations implemented and how to configure them for different domains.

## 🎯 SEO Implementation Status: ~95%

### ✅ Completed Features

1. **robots.txt** - Multi-domain support for crawlers
2. **Dynamic Sitemap** - Auto-generated with all pages and blog/news articles
3. **Page Metadata** - Dynamic metadata for all major pages
4. **Structured Data (JSON-LD)** - Organization, LocalBusiness, Article schemas
5. **Canonical URLs** - Proper canonical URL configuration
6. **Open Graph & Twitter Cards** - Social media optimization
7. **Security Headers** - SEO-friendly security headers

---

## 🌐 Multi-Domain Setup

The site is optimized for multiple domain variants:
- `prime-agrofarms.com` (primary)
- `primeagrofarms.com`
- `primeagrofarm.com`
- Any other domain variants

### Environment Configuration

Add to your `.env.local` or production environment:

```bash
# Primary domain for canonical URLs and sitemap
NEXT_PUBLIC_SITE_URL=https://prime-agrofarms.com
```

**Important:** 
- Use your primary/preferred domain as the canonical URL
- This ensures search engines know which domain is the "main" one
- Helps prevent duplicate content penalties

---

## 📁 Files Created

### Core SEO Files
- `public/robots.txt` - Search engine crawler instructions
- `src/app/sitemap.ts` - Dynamic sitemap generator
- `src/lib/metadata.ts` - Metadata generation utilities
- `src/lib/structured-data.ts` - JSON-LD schema generators

### Page Metadata Files
- `src/app/about/metadata.ts`
- `src/app/services/metadata.ts`
- `src/app/contact/metadata.ts`
- `src/app/news/metadata.ts`
- `src/app/blog/metadata.ts`
- `src/app/gallery/metadata.ts`

---

## 🔍 What Each File Does

### 1. robots.txt
```
- Tells search engines which pages to crawl
- Blocks admin and API routes from indexing
- Points to sitemap.xml for all domain variants
```

### 2. sitemap.ts
```
- Dynamically generates XML sitemap
- Includes all static pages
- Automatically includes all news and blog articles from database
- Updates based on publish/modified dates
```

### 3. metadata.ts
```
- Centralizes metadata generation
- Ensures consistent SEO across all pages
- Handles OpenGraph and Twitter cards
- Manages canonical URLs
```

### 4. structured-data.ts
```
- Creates JSON-LD structured data
- Organization schema (business info)
- LocalBusiness schema (location, hours, etc.)
- Article schema (for blog/news posts)
- Breadcrumb schema
- Service schema
- FAQ schema
```

---

## 🚀 How to Use for Future Pages

### Adding Metadata to New Pages

1. **Create metadata file** (e.g., `src/app/new-page/metadata.ts`):
```typescript
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Your Page Title',
  description: 'Your page description',
  keywords: ['keyword1', 'keyword2'],
  path: '/new-page',
});
```

2. **Export from page** (if Server Component):
```typescript
export { metadata } from './metadata';
```

### Adding Structured Data to Pages

In your page component, add the schema to the head:
```typescript
import { generateArticleSchema } from '@/lib/structured-data';

export default function ArticlePage() {
  const schema = generateArticleSchema({
    headline: 'Article Title',
    description: 'Article description',
    image: 'https://example.com/image.jpg',
    datePublished: '2025-01-01',
    url: 'https://prime-agrofarms.com/article',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Your page content */}
    </>
  );
}
```

---

## 📊 SEO Best Practices Implemented

### Technical SEO
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1 → H6)
- ✅ Alt text for all images
- ✅ Fast page load times
- ✅ Mobile-responsive design
- ✅ HTTPS (configure on hosting)
- ✅ Clean URLs with proper slugs

### On-Page SEO
- ✅ Unique titles for each page
- ✅ Compelling meta descriptions
- ✅ Relevant keywords
- ✅ Internal linking
- ✅ Breadcrumb navigation
- ✅ Social media meta tags

### Content SEO
- ✅ Quality, relevant content
- ✅ Keyword optimization
- ✅ Regular content updates (blog/news)
- ✅ Proper content structure

---

## 🎯 Domain Configuration

### Setting Up Primary Domain

1. **Choose your primary domain** (e.g., `prime-agrofarms.com`)
2. **Set environment variable:**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://prime-agrofarms.com
   ```
3. **Configure DNS** to point all variants to your hosting
4. **Set up redirects** (optional) to redirect other domains to primary:
   ```
   primeagrofarms.com → prime-agrofarms.com
   primeagrofarm.com → prime-agrofarms.com
   ```

### Why This Matters
- Prevents duplicate content issues
- Consolidates SEO authority to one domain
- Improves search rankings
- Provides clear canonical URL

---

## 🔄 Dynamic Content Updates

The sitemap automatically updates when you:
- Add new blog posts
- Add new news articles
- Update existing content

No manual sitemap updates needed!

---

## 📈 Monitoring SEO Performance

### Tools to Use
1. **Google Search Console** - Monitor indexing, rankings, issues
2. **Google Analytics** - Track traffic and user behavior
3. **SEO crawlers** (Screaming Frog, Ahrefs) - Audit site health

### Key Metrics to Track
- Organic traffic
- Keyword rankings
- Page load speed
- Mobile usability
- Indexation status
- Backlinks

---

## ✅ SEO Checklist

Before going live:
- [ ] Set `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Verify robots.txt is accessible at `/robots.txt`
- [ ] Verify sitemap is accessible at `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics
- [ ] Verify all pages have unique titles and descriptions
- [ ] Test mobile responsiveness
- [ ] Check page load speeds
- [ ] Verify all images have alt text
- [ ] Set up 301 redirects for domain variants (if needed)

---

## 🆘 Troubleshooting

### Sitemap not showing articles?
- Check database connection
- Verify `news` and `blog` tables exist
- Check console for errors

### Wrong domain in sitemap?
- Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- Restart development server after changing env vars

### Pages not indexed?
- Check robots.txt isn't blocking pages
- Submit sitemap to Google Search Console
- Wait 1-2 weeks for crawling/indexing

---

## 📚 Additional Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

**Need help?** Contact the development team or refer to Next.js SEO best practices documentation.
