"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, User, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
      fetchPost(resolvedParams.slug);
    });
  }, [params]);

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
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <nav className="flex items-center gap-2 text-white/70 mb-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white line-clamp-1">{post.title}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.published_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-2xl"
            >
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-12">
              <aside className="lg:col-span-1 space-y-6">
                <div className="sticky top-24">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Article
                    </h3>
                    <div className="space-y-2">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Facebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          Facebook
                        </span>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Twitter className="w-5 h-5 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          Twitter
                        </span>
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          LinkedIn
                        </span>
                      </a>
                      <a
                        href={`mailto:?subject=${post.title}&body=Check out this article: ${shareUrl}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Mail className="w-5 h-5 text-primary-green group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                          Email
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </aside>

              <article className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-lg max-w-none whitespace-pre-line mb-12"
                  >
                    {post.content}
                  </motion.div>

                  {post.gallery_images && post.gallery_images.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mb-12"
                    >
                      <h2 className="text-2xl font-bold text-foreground mb-6">Gallery</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {post.gallery_images.map((url, index) => (
                          <div 
                            key={index} 
                            className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                          >
                            <Image
                              src={url}
                              alt={`Gallery image ${index + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                {relatedPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 pt-16 border-t border-border"
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-8">
                      Related Articles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.id}
                          href={`/blog/${related.slug}`}
                          className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={related.image_url}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-foreground mt-3 mb-2 line-clamp-2 group-hover:text-primary-green transition-colors">
                              {related.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {related.excerpt}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
          </div>
        </div>
      </section>
    </>
  );
}
