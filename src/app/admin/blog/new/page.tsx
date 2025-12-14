"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ArrowLeft,
  Upload,
  Save,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: BookOpen, label: "Blog", href: "/admin/blog", active: true },
  { icon: ImageIcon, label: "Gallery", href: "/admin/gallery" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Mail, label: "Messages", href: "/admin/messages" },
  { icon: Users, label: "Leadership", href: "/admin/leadership" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function NewBlogPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    published_date: new Date().toISOString().split("T")[0],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${generateSlug(formData.title)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      const { error: insertError } = await supabase.from("blogs").insert([
        {
          ...formData,
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("Blog post created successfully!");
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog post");
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
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-foreground">Add Blog Post</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-secondary">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white rounded-xl border border-border p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Title *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Slug *
              </label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="blog-post-slug-url"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL-friendly version (auto-generated from title)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Author *
              </label>
              <Input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the blog post"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full blog post content"
                rows={15}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Feature Image *
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                    <label htmlFor="image-upload">
                      <Button type="button" variant="outline" asChild>
                        <span>Choose Image</span>
                      </Button>
                    </label>
                    <p className="text-sm text-muted-foreground mt-2">
                      PNG, JPG or WEBP (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Published Date *
              </label>
              <Input
                type="date"
                value={formData.published_date}
                onChange={(e) =>
                  setFormData({ ...formData, published_date: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="btn-primary flex-1"
                disabled={loading}
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Publish Blog Post
                  </>
                )}
              </Button>
              <Link href="/admin/blog" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </motion.form>
        </main>
      </div>
    </div>
  );
}
