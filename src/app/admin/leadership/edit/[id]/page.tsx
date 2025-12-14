"use client";

import { useState, useEffect, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function EditLeaderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    description: "",
    phone: "",
    linkedin_link: "",
    twitter_link: "",
    is_ceo: false,
    display_order: 0,
    image_url: "",
  });

  useEffect(() => {
    fetchLeader();
  }, []);

  const fetchLeader = async () => {
    try {
      const { data, error } = await supabase
        .from("leaders")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          position: data.position,
          description: data.description,
          phone: data.phone || "",
          linkedin_link: data.linkedin_link || "",
          twitter_link: data.twitter_link || "",
          is_ceo: data.is_ceo,
          display_order: data.display_order,
          image_url: data.image_url,
        });
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error("Error fetching leader:", error);
      alert("Failed to fetch leader");
    } finally {
      setFetching(false);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        if (formData.image_url && formData.image_url.includes("supabase")) {
          const oldImagePath = formData.image_url.split("/").pop();
          if (oldImagePath) {
            await supabase.storage.from("leader-images").remove([oldImagePath]);
          }
        }

        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("leader-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("leader-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const whatsappLink = formData.phone 
        ? `https://wa.me/${formData.phone.replace(/\D/g, "")}`
        : null;

      const { error: updateError } = await supabase
        .from("leaders")
        .update({
          name: formData.name,
          position: formData.position,
          description: formData.description,
          image_url: imageUrl,
          phone: formData.phone || null,
          whatsapp_link: whatsappLink,
          linkedin_link: formData.linkedin_link || null,
          twitter_link: formData.twitter_link || null,
          is_ceo: formData.is_ceo,
          display_order: formData.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq("id", resolvedParams.id);

      if (updateError) throw updateError;

      router.push("/admin/leadership");
    } catch (error) {
      console.error("Error updating leader:", error);
      alert("Failed to update leader");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-muted-foreground">Loading leader...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-custom py-8">
        <Link
          href="/admin/leadership"
          className="inline-flex items-center text-primary-green hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Leadership
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-border p-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-6">Edit Leader</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Leader Image *
              </label>
              {imagePreview ? (
                <div className="relative w-48 h-48 rounded-lg overflow-hidden mb-4">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  {imageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(formData.image_url);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : null}
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Position *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Operations Manager"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description/Bio *
              </label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter leader's biography and achievements"
                rows={5}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number (WhatsApp)
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g., 256700123456"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Any format accepted. WhatsApp link auto-generated.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Display Order
                </label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lower numbers appear first
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  LinkedIn URL
                </label>
                <Input
                  type="url"
                  value={formData.linkedin_link}
                  onChange={(e) => setFormData({ ...formData, linkedin_link: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Twitter/X URL
                </label>
                <Input
                  type="url"
                  value={formData.twitter_link}
                  onChange={(e) => setFormData({ ...formData, twitter_link: e.target.value })}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_ceo"
                checked={formData.is_ceo}
                onChange={(e) => setFormData({ ...formData, is_ceo: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_ceo" className="text-sm font-medium text-foreground">
                Mark as CEO (will display with special prominence)
              </label>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Updating..." : "Update Leader"}
              </Button>
              <Link href="/admin/leadership" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}