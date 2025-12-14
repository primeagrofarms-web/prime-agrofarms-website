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
  BookOpen,
  Search,
  Eye,
  Trash2,
  CheckCircle,
  Circle,
  UserPlus,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: BookOpen, label: "Blog", href: "/admin/blog" },
  { icon: Image, label: "Gallery", href: "/admin/gallery" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Mail, label: "Messages", href: "/admin/messages", active: true },
  { icon: UserPlus, label: "Subscribers", href: "/admin/subscribers" },
  { icon: Users, label: "Leadership", href: "/admin/leadership" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function MessagesManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filterStatus]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ status: "read" })
        .eq("id", messageId);

      if (error) throw error;
      
      fetchMessages();
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: "read" });
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;
      
      fetchMessages();
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((msg) => msg.status === "unread").length;

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
              <h1 className="text-xl font-bold text-foreground">Contact Messages</h1>
              {unreadCount > 0 && (
                <span className="px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-600 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-secondary">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className="whitespace-nowrap"
              >
                All ({messages.length})
              </Button>
              <Button
                variant={filterStatus === "unread" ? "default" : "outline"}
                onClick={() => setFilterStatus("unread")}
                className="whitespace-nowrap"
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filterStatus === "read" ? "default" : "outline"}
                onClick={() => setFilterStatus("read")}
                className="whitespace-nowrap"
              >
                Read ({messages.length - unreadCount})
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 bg-white rounded-xl border border-border">
              <p className="text-muted-foreground">Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-border">
              <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No messages found" : "No messages yet"}
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {filteredMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.status === "unread") {
                        handleMarkAsRead(message.id);
                      }
                    }}
                    className={`bg-white rounded-xl p-6 border cursor-pointer transition-all hover:shadow-md ${
                      message.status === "unread"
                        ? "border-orange-200 bg-orange-50/30"
                        : "border-border"
                    } ${
                      selectedMessage?.id === message.id
                        ? "ring-2 ring-primary-green"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {message.status === "unread" ? (
                          <Circle className="w-4 h-4 text-orange-500 fill-orange-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        <h3 className="font-bold text-foreground">{message.name}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                    <p className="font-semibold text-foreground mb-2 line-clamp-1">
                      {message.subject}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {message.message}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="lg:sticky lg:top-24 h-fit">
                {selectedMessage ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-xl p-6 border border-border"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          {selectedMessage.subject}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium">{selectedMessage.name}</span>
                          <span>•</span>
                          <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                      {selectedMessage.status === "unread" ? (
                        <Circle className="w-5 h-5 text-orange-500 fill-orange-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-primary-green hover:underline"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                      {selectedMessage.phone && (
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-1">
                            Phone
                          </p>
                          <a
                            href={`tel:${selectedMessage.phone}`}
                            className="text-primary-green hover:underline"
                          >
                            {selectedMessage.phone}
                          </a>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          Message
                        </p>
                        <p className="text-foreground whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border">
                      {selectedMessage.status === "unread" && (
                        <Button
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                          className="flex-1"
                          variant="default"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="flex-1"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-xl p-12 border border-border text-center">
                    <Mail className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Select a message to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
