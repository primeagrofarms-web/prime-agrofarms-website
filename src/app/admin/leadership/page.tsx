"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Leader {
  id: string;
  name: string;
  position: string;
  description: string;
  image_url: string;
  phone: string | null;
  whatsapp_link: string | null;
  linkedin_link: string | null;
  twitter_link: string | null;
  is_ceo: boolean;
  display_order: number;
}

export default function AdminLeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from("leaders")
        .select("*")
        .order("is_ceo", { ascending: false })
        .order("display_order", { ascending: true });

      if (error) throw error;
      setLeaders(data || []);
    } catch (error) {
      console.error("Error fetching leaders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this leader?")) return;

    try {
      if (imageUrl && imageUrl.includes("supabase")) {
        const imagePath = imageUrl.split("/").pop();
        if (imagePath) {
          await supabase.storage.from("leader-images").remove([imagePath]);
        }
      }

      const { error } = await supabase.from("leaders").delete().eq("id", id);

      if (error) throw error;
      fetchLeaders();
    } catch (error) {
      console.error("Error deleting leader:", error);
      alert("Failed to delete leader");
    }
  };

  const filteredLeaders = leaders.filter(
    (leader) =>
      leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Leadership Management</h1>
            <p className="text-muted-foreground">Manage farm leaders and their information</p>
          </div>
          <Link href="/admin/leadership/new">
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Leader
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-border p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search leaders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-muted-foreground">Loading leaders...</p>
          </div>
        ) : filteredLeaders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-muted-foreground">No leaders found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredLeaders.map((leader) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-border overflow-hidden"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="relative aspect-square md:aspect-auto">
                    <Image
                      src={leader.image_url}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-4 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{leader.name}</h3>
                          {leader.is_ceo && (
                            <span className="inline-flex items-center gap-1 bg-gold-accent/10 text-gold-accent px-3 py-1 rounded-full text-xs font-medium">
                              <Award className="w-3 h-3" />
                              CEO
                            </span>
                          )}
                        </div>
                        <p className="text-primary-green font-medium">{leader.position}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/leadership/edit/${leader.id}`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(leader.id, leader.image_url)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {leader.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {leader.phone && (
                        <span className="px-3 py-1 bg-secondary rounded-full">
                          📱 {leader.phone}
                        </span>
                      )}
                      {leader.whatsapp_link && (
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
                          WhatsApp
                        </span>
                      )}
                      {leader.linkedin_link && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                          LinkedIn
                        </span>
                      )}
                      {leader.twitter_link && (
                        <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full">
                          Twitter
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
