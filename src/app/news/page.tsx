"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search, Calendar, Eye, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const newsArticles = [
  {
    id: 1,
    title: "Prime Agro Farm Wins Uganda's Best Farmer 2025",
    slug: "best-farmer-2025",
    excerpt: "Sebastian Rutah Ngambwa recognized for outstanding contributions to agricultural excellence and innovation in dairy farming.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800",
    date: "2025-01-15",
    views: 3456,
    category: "Awards",
  },
  {
    id: 2,
    title: "New Automated Milking System Installation Complete",
    slug: "new-milking-system",
    excerpt: "Modernizing our dairy operations with cutting-edge robotic milking technology for improved efficiency and animal welfare.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=800",
    date: "2024-12-01",
    views: 2189,
    category: "Technology",
  },
  {
    id: 3,
    title: "Community Training Program Reaches 1000 Farmers",
    slug: "community-training-milestone",
    excerpt: "A milestone achievement in our commitment to empowering local farmers with modern agricultural techniques.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    date: "2024-11-15",
    views: 1876,
    category: "Community",
  },
  {
    id: 4,
    title: "Expanding Our Silage Production Capacity",
    slug: "silage-expansion",
    excerpt: "New storage facilities and equipment to meet growing demand for quality animal feed in the region.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800",
    date: "2024-10-20",
    views: 1234,
    category: "Operations",
  },
  {
    id: 5,
    title: "Partnership with Agricultural Research Institute",
    slug: "research-partnership",
    excerpt: "Collaborating with leading researchers to advance sustainable farming practices in East Africa.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
    date: "2024-09-05",
    views: 987,
    category: "Partnerships",
  },
  {
    id: 6,
    title: "Youth Agriculture Program Launch",
    slug: "youth-program-launch",
    excerpt: "Introducing young people to modern farming careers through our new internship and mentorship program.",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
    date: "2024-08-10",
    views: 1567,
    category: "Education",
  },
];

const categories = ["All", "Awards", "Technology", "Community", "Operations", "Partnerships", "Education"];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="relative py-20 gradient-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <nav className="flex items-center gap-2 text-white/70 mb-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">News</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
            <p className="text-lg text-white/90">
              Stay informed about the latest developments, achievements, and events at Prime Agro Farm.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className={activeCategory === category ? "bg-primary-green hover:bg-secondary-green" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                {filteredNews.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-border card-hover"
                  >
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="relative aspect-[16/10] md:aspect-auto">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-xs font-medium px-3 py-1 bg-primary-green/10 text-primary-green rounded-full">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <Link
                          href={`/news/${article.slug}`}
                          className="inline-flex items-center text-primary-green font-semibold hover:gap-3 transition-all gap-2"
                        >
                          Read More
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl">
                  <p className="text-muted-foreground text-lg">No news articles found matching your criteria.</p>
                </div>
              )}
            </div>

            <aside className="lg:w-1/4 space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          activeCategory === category
                            ? "bg-primary-green text-white"
                            : "hover:bg-secondary text-muted-foreground"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Popular Articles</h3>
                <ul className="space-y-4">
                  {newsArticles.slice(0, 3).map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/news/${article.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary-green line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {article.views} views
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary-green to-accent-green rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Subscribe to Updates</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest news delivered to your inbox.
                </p>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="mb-3 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
                <Button className="w-full bg-white text-primary-green hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
