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
  Download,
  Trash2,
  Search,
  UserPlus,
  Calendar,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: BookOpen, label: "Blog", href: "/admin/blog" },
  { icon: Image, label: "Gallery", href: "/admin/gallery" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Mail, label: "Messages", href: "/admin/messages" },
  { icon: UserPlus, label: "Subscribers", href: "/admin/subscribers", active: true },
  { icon: Users, label: "Leadership", href: "/admin/leadership" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export default function SubscribersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredSubscribers(
        subscribers.filter((sub) =>
          sub.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredSubscribers(subscribers);
    }
  }, [searchQuery, subscribers]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
      setFilteredSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchSubscribers();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Failed to delete subscriber");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSubscribers.length === 0) return;
    if (!confirm(`Are you sure you want to remove ${selectedSubscribers.length} subscriber(s)?`)) return;

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .in("id", selectedSubscribers);

      if (error) throw error;
      setSelectedSubscribers([]);
      fetchSubscribers();
    } catch (error) {
      console.error("Error deleting subscribers:", error);
      alert("Failed to delete subscribers");
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Email", "Subscribed Date"],
      ...filteredSubscribers.map((sub) => [
        sub.email,
        new Date(sub.subscribed_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const toggleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filteredSubscribers.map((sub) => sub.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedSubscribers((prev) =>
      prev.includes(id) ? prev.filter((subId) => subId !== id) : [...prev, id]
    );
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
              <div>
                <h1 className="text-xl font-bold text-foreground">Newsletter Subscribers</h1>
                <nav className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Link href="/admin" className="hover:text-foreground">Dashboard</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span>Subscribers</span>
                </nav>
              </div>
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
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-border"
          >
            <div className="p-6 border-b border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">All Subscribers</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total: {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={exportToCSV}
                    variant="outline"
                    size="sm"
                    disabled={filteredSubscribers.length === 0}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  {selectedSubscribers.length > 0 && (
                    <Button
                      onClick={handleBulkDelete}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete ({selectedSubscribers.length})
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 text-center text-muted-foreground">Loading subscribers...</div>
              ) : filteredSubscribers.length === 0 ? (
                <div className="p-12 text-center">
                  <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "No subscribers found matching your search" : "No subscribers yet"}
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.length === filteredSubscribers.length}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Subscribed Date</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedSubscribers.includes(subscriber.id)}
                            onChange={() => toggleSelect(subscriber.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center">
                              <Mail className="w-4 h-4 text-primary-green" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{subscriber.email}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(subscriber.subscribed_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="p-4">
                          <Button
                            onClick={() => handleDelete(subscriber.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
