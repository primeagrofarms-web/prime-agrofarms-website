"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  published_date: string;
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Latest News
            </h2>
            <p className="text-muted-foreground">Stay updated with our farm activities</p>
          </div>
          <Link href="/news" className="btn-outline">
            View All News
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news articles yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div 
                  className="relative aspect-[16/10] overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(item.published_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{item.excerpt}</p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center text-primary-green font-semibold group"
                  >
                    Read More
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
