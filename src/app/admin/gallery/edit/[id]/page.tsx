"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  ArrowLeft,
  Upload,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: ImageIcon, label: "Gallery", href: "/admin/gallery", active: true },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Mail, label: "Messages", href: "/admin/messages" },
  { icon: Users, label: "Leadership", href: "/admin/leadership" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const categories = [
  { id: "livestock", label: "Livestock" },
  { id: "facilities", label: "Facilities" },
  { id: "landscape", label: "Landscape" },
  { id: "production", label: "Production" },
];

export default function EditGalleryItem() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "livestock",
  });

  useEffect(() => {
    if (id) {
      fetchGalleryItem();
    }
  }, [id]);

  const fetchGalleryItem = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
        });
        setCurrentImageUrl(data.image_url);
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      alert("Failed to fetch gallery item");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG, and WEBP images are allowed');
        e.target.value = '';
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = currentImageUrl;

      if (imageFile) {
        if (currentImageUrl) {
          const oldImagePath = currentImageUrl.split("/").pop();
          if (oldImagePath) {
            await supabase.storage.from("gallery-images").remove([oldImagePath]);
          }
        }

        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("gallery-images").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error: updateError } = await supabase
        .from("gallery")
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image_url: imageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      alert("Gallery item updated successfully!");
      router.push("/admin/gallery");
    } catch (error) {
      console.error("Error updating gallery item:", error);
      alert("Failed to update gallery item");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

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
          <div className="flex items-center gap-4 px-6 py-4">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/admin/gallery">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Edit Gallery Image</h1>
          </div>
        </header>

        <main className="flex-1 p-6 bg-secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="image">Image</Label>
                  <div className="mt-2">
                    {imagePreview && (
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4">
                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Leave empty to keep current image
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter image title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter image description"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={loading} className="btn-primary">
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Update Image"}
                  </Button>
                  <Link href="/admin/gallery">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}