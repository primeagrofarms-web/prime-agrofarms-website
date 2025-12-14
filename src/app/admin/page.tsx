"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Newspaper,
  Image,
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
  { icon: Image, label: "Gallery", href: "/admin/gallery" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Mail, label: "Messages", href: "/admin/messages" },
  { icon: UserPlus, label: "Subscribers", href: "/admin/subscribers" },
  { icon: Users, label: "Leadership", href: "/admin/leadership" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const recentActivity = [
  { type: "message", content: "New contact message from John Doe", time: "5 min ago" },
  { type: "news", content: "News article published: Best Farmer 2025", time: "1 hour ago" },
  { type: "subscriber", content: "New newsletter subscriber", time: "2 hours ago" },
  { type: "comment", content: "New comment pending approval", time: "3 hours ago" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState([
    { label: "Total News", value: "0", change: "+0 this month", icon: Newspaper, color: "bg-blue-500" },
    { label: "Gallery Images", value: "0", change: "+0 this month", icon: Image, color: "bg-green-500" },
    { label: "Messages", value: "0", change: "0 unread", icon: Mail, color: "bg-orange-500" },
    { label: "Subscribers", value: "0", change: "+0 this month", icon: UserPlus, color: "bg-purple-500" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const [newsResult, galleryResult, subscribersResult, messagesResult] = await Promise.all([
        supabase.from("news").select("id, created_at", { count: "exact" }),
        supabase.from("gallery").select("id, created_at", { count: "exact" }),
        supabase.from("newsletter_subscribers").select("id, created_at", { count: "exact" }),
        supabase.from("messages").select("id, status", { count: "exact" }),
      ]);

      const totalNews = newsResult.count || 0;
      const newsThisMonth = newsResult.data?.filter(
        (item) => new Date(item.created_at) >= oneMonthAgo
      ).length || 0;

      const totalGallery = galleryResult.count || 0;
      const galleryThisMonth = galleryResult.data?.filter(
        (item) => new Date(item.created_at) >= oneMonthAgo
      ).length || 0;

      const totalSubscribers = subscribersResult.count || 0;
      const subscribersThisMonth = subscribersResult.data?.filter(
        (item) => new Date(item.created_at) >= oneMonthAgo
      ).length || 0;

      const totalMessages = messagesResult.count || 0;
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
          icon: Image,
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
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold">PA</span>
              </div>
              <div>
                <h2 className="font-bold">Prime Agro Farm</h2>
                <p className="text-xs text-sidebar-foreground/70">Admin Panel</p>
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
                  href="/admin/gallery/upload"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Image className="w-5 h-5 text-primary-green" />
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