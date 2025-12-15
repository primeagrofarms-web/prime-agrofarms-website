"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Newspaper,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  TrendingUp,
  Eye,
  UserPlus,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: BookOpen, label: "Blog", href: "/admin/blog" },
  { icon: ImageIcon, label: "Gallery", href: "/admin/gallery" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Mail, label: "Messages", href: "/admin/messages" },
  { icon: UserPlus, label: "Subscribers", href: "/admin/subscribers" },
  { icon: Users, label: "Leadership", href: "/admin/leadership" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface ActivityItem {
  type: "message" | "news" | "subscriber" | "comment" | "blog" | "gallery";
  content: string;
  time: string;
  timestamp: Date;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState([
    { label: "Total News", value: "0", change: "+0 this month", icon: Newspaper, color: "bg-blue-500" },
    { label: "Gallery Images", value: "0", change: "+0 this month", icon: ImageIcon, color: "bg-green-500" },
    { label: "Messages", value: "0", change: "0 unread", icon: Mail, color: "bg-orange-500" },
    { label: "Subscribers", value: "0", change: "+0 this month", icon: UserPlus, color: "bg-purple-500" },
  ]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const fetchDashboardData = async () => {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const [newsResult, galleryResult, subscribersResult, messagesResult, blogResult, commentsResult] = await Promise.all([
        supabase.from("news").select("id, title, created_at").order("created_at", { ascending: false }),
        supabase.from("gallery").select("id, title, created_at").order("created_at", { ascending: false }),
        supabase.from("newsletter_subscribers").select("id, email, created_at").order("created_at", { ascending: false }),
        supabase.from("messages").select("id, name, status, created_at").order("created_at", { ascending: false }),
        supabase.from("blog_posts").select("id, title, created_at").order("created_at", { ascending: false }),
        supabase.from("comments").select("id, author_name, created_at").order("created_at", { ascending: false }),
      ]);

      const totalNews = newsResult.data?.length || 0;
      const newsThisMonth = newsResult.data?.filter(
        (item) => new Date(item.created_at) >= oneMonthAgo
      ).length || 0;

      const totalGallery = galleryResult.data?.length || 0;
      const galleryThisMonth = galleryResult.data?.filter(
        (item) => new Date(item.created_at) >= oneMonthAgo
      ).length || 0;

      const totalSubscribers = subscribersResult.data?.length || 0;
      const subscribersThisMonth = subscribersResult.data?.filter(
        (item) => new Date(item.created_at) >= oneMonthAgo
      ).length || 0;

      const totalMessages = messagesResult.data?.length || 0;
      const unreadMessages = messagesResult.data?.filter(
        (msg) => msg.status === "unread"
      ).length || 0;

      setStats([
        {
          label: "Total News",
          value: totalNews.toString(),
          change: `+${newsThisMonth} this month`,
          icon: Newspaper,
          color: "bg-blue-500",
        },
        {
          label: "Gallery Images",
          value: totalGallery.toString(),
          change: `+${galleryThisMonth} this month`,
          icon: ImageIcon,
          color: "bg-green-500",
        },
        {
          label: "Messages",
          value: totalMessages.toString(),
          change: `${unreadMessages} unread`,
          icon: Mail,
          color: "bg-orange-500",
        },
        {
          label: "Subscribers",
          value: totalSubscribers.toString(),
          change: `+${subscribersThisMonth} this month`,
          icon: UserPlus,
          color: "bg-purple-500",
        },
      ]);

      // Compile recent activity from all sources
      const activities: ActivityItem[] = [];

      // Add messages
      messagesResult.data?.slice(0, 3).forEach((msg) => {
        activities.push({
          type: "message",
          content: `New contact message from ${msg.name}`,
          time: getRelativeTime(new Date(msg.created_at)),
          timestamp: new Date(msg.created_at),
        });
      });

      // Add news
      newsResult.data?.slice(0, 2).forEach((news) => {
        activities.push({
          type: "news",
          content: `News article published: ${news.title}`,
          time: getRelativeTime(new Date(news.created_at)),
          timestamp: new Date(news.created_at),
        });
      });

      // Add blog posts
      blogResult.data?.slice(0, 2).forEach((blog) => {
        activities.push({
          type: "blog",
          content: `Blog post published: ${blog.title}`,
          time: getRelativeTime(new Date(blog.created_at)),
          timestamp: new Date(blog.created_at),
        });
      });

      // Add subscribers
      subscribersResult.data?.slice(0, 2).forEach((sub) => {
        activities.push({
          type: "subscriber",
          content: `New newsletter subscriber: ${sub.email}`,
          time: getRelativeTime(new Date(sub.created_at)),
          timestamp: new Date(sub.created_at),
        });
      });

      // Add comments
      commentsResult.data?.slice(0, 2).forEach((comment) => {
        activities.push({
          type: "comment",
          content: `New comment from ${comment.author_name}`,
          time: getRelativeTime(new Date(comment.created_at)),
          timestamp: new Date(comment.created_at),
        });
      });

      // Add gallery uploads
      galleryResult.data?.slice(0, 2).forEach((img) => {
        activities.push({
          type: "gallery",
          content: `New image uploaded: ${img.title || "Untitled"}`,
          time: getRelativeTime(new Date(img.created_at)),
          timestamp: new Date(img.created_at),
        });
      });

      // Sort by timestamp and take top 5
      activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setRecentActivity(activities.slice(0, 5));

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-16">
                <Image
                  src="/images/logo/Prime LOGO.png"
                  alt="Prime Agro Farm Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-sidebar-accent/50 transition-colors text-red-300">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-green flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border animate-pulse"
                >
                  <div className="h-20"></div>
                </div>
              ))
            ) : (
              stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-border"
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-gray-300" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-300 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No recent activity
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary-green" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-border"
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  href="/admin/news/new"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Newspaper className="w-5 h-5 text-primary-green" />
                    <span>Add New Article</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                <Link
                  href="/admin/gallery/new"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-primary-green" />
                    <span>Upload Images</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                <Link
                  href="/admin/messages"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-green" />
                    <span>View Messages</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary-green" />
                    <span>View Website</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}