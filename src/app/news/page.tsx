"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search, Calendar, Eye, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  published_date: string;
}

const categories = ["All"];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, slug, excerpt, image_url, published_date")
        .order("published_date", { ascending: false });

      if (error) throw error;
      setNewsArticles(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All";
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
              </div>

              {loading ? (
                <div className="text-center py-16 bg-white rounded-xl">
                  <p className="text-muted-foreground text-lg">Loading news...</p>
                </div>
              ) : filteredNews.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl">
                  <p className="text-muted-foreground text-lg">No news articles found matching your criteria.</p>
                </div>
              ) : (
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
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {new Date(article.published_date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
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
              )}
            </div>

            <aside className="lg:w-1/4 space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Recent Articles</h3>
                <ul className="space-y-4">
                  {newsArticles.slice(0, 3).map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/news/${article.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image_url}
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
                            {new Date(article.published_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
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