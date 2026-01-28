"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, User, Eye, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import ImageLightbox from "@/components/ImageLightbox";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  gallery_images?: string[];
  author: string;
  published_date: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
  const { slug: resolvedSlug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleryImages = post?.gallery_images || [];
  const allImages = post ? [post.image_url, ...galleryImages] : [];

  useEffect(() => {
    if (resolvedSlug) {
      fetchPost(resolvedSlug);
    }
  }, [resolvedSlug]);

  const fetchPost = async (postSlug: string) => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", postSlug)
        .single();

      if (error) throw error;
      
      if (!data) {
        notFound();
      }

      setPost(data);
      fetchRelatedPosts(data.id);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (currentPostId: string) => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, image_url, author, published_date")
        .neq("id", currentPostId)
        .order("published_date", { ascending: false })
        .limit(2);

      if (error) throw error;
      setRelatedPosts(data || []);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading blog post...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <section className="relative py-20 gradient-green text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white/5 blur-3xl rounded-full translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-green/10 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container-custom relative">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium">
                Farm Insights
              </span>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.published_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center text-white/80 text-sm">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <article>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl group cursor-pointer"
                  onClick={() => setSelectedImageIndex(0)}
                >
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-primary-green px-4 py-2 rounded-full font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4" /> View Full Image
                    </span>
                  </div>
                </motion.div>

                <div className="prose prose-lg max-w-none prose-headings:text-primary-green prose-a:text-accent-green">
                  {post.content.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {galleryImages.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-2xl font-bold text-primary-green mb-8">
                      Photo Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryImages.map((img, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer group"
                          onClick={() => setSelectedImageIndex(idx + 1)}
                        >
                          <Image
                            src={img}
                            alt={`${post.title} - Image ${idx + 2}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="text-white w-6 h-6" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 pt-12 border-t border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 font-medium">Share this post:</span>
                      <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-all">
                          <Facebook className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-all">
                          <Twitter className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-all">
                          <Linkedin className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-all">
                          <Mail className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 bg-gradient-to-br from-primary-green to-accent-green rounded-2xl p-8 text-white"
                >
                  <h3 className="text-2xl font-bold mb-3">
                    Explore More Insights
                  </h3>
                  <p className="text-white/90 mb-6">
                    Discover more articles, tips, and knowledge from our farming experts.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center btn-primary bg-white text-primary-green hover:bg-white/90 group"
                  >
                    View All Blog Posts
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </article>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                {relatedPosts.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-primary-green mb-6 pb-2 border-b-2 border-accent-green/30">
                      Related Posts
                    </h3>
                    <div className="space-y-8">
                      {relatedPosts.map((item) => (
                        <Link
                          key={item.id}
                          href={`/blog/${item.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-4">
                            <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                              <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-accent-green font-medium mb-1">
                                {new Date(item.published_date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </div>
                              <h4 className="font-bold text-gray-900 group-hover:text-primary-green transition-colors line-clamp-2">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-secondary rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-primary-green mb-4">
                    Newsletter
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Get the latest agricultural insights delivered to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                    />
                    <button className="w-full btn-primary py-3">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageLightbox
        images={allImages}
        currentIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        onPrev={() => setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null))}
        onNext={() => setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null))}
        title={post.title}
      />
    </>
  );
}
