"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, X, ChevronLeft, ChevronRight as ChevronRightIcon, Eye, Heart, Grid, Rows } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All Photos" },
  { id: "facilities", label: "Facilities" },
  { id: "livestock", label: "Livestock" },
  { id: "landscape", label: "Landscape" },
  { id: "production", label: "Production" },
  { id: "education", label: "Education" },
];

const galleryImages = [
  { id: 1, title: "Modern Dairy Barn", category: "facilities", image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=800", views: 1250, likes: 89 },
  { id: 2, title: "Holstein Dairy Cattle", category: "livestock", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800", views: 2100, likes: 156 },
  { id: 3, title: "Green Pastures", category: "landscape", image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800", views: 980, likes: 67 },
  { id: 4, title: "Automated Milking System", category: "production", image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800", views: 1567, likes: 112 },
  { id: 5, title: "Training Workshop", category: "education", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800", views: 876, likes: 45 },
  { id: 6, title: "Feed Storage Silos", category: "facilities", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800", views: 654, likes: 34 },
  { id: 7, title: "Jersey Cows Grazing", category: "livestock", image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800", views: 1890, likes: 143 },
  { id: 8, title: "Farm Aerial View", category: "landscape", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800", views: 2340, likes: 198 },
  { id: 9, title: "Quality Testing Lab", category: "production", image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800", views: 432, likes: 28 },
  { id: 10, title: "Farmer Training Session", category: "education", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800", views: 765, likes: 52 },
  { id: 11, title: "Milking Parlor Interior", category: "facilities", image: "https://images.unsplash.com/photo-1605639156648-3d7eb5fe5ff7?w=800", views: 1123, likes: 78 },
  { id: 12, title: "Calves at Feeding Time", category: "livestock", image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800", views: 1678, likes: 134 },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  return (
    <>
      <section className="relative py-20 gradient-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <nav className="flex items-center gap-2 text-white/70 mb-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Gallery</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-lg text-white/90">
              Explore our farm through stunning imagery showcasing our facilities, livestock, and daily operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={activeCategory === category.id ? "bg-primary-green hover:bg-secondary-green" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-primary-green" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "masonry" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("masonry")}
                className={viewMode === "masonry" ? "bg-primary-green" : ""}
              >
                <Rows className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <motion.div
            layout
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-xl shadow-lg cursor-pointer ${
                    viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={`relative ${viewMode === "grid" ? "aspect-square" : ""}`}>
                    <Image
                      src={image.image}
                      alt={image.title}
                      width={400}
                      height={viewMode === "masonry" ? (index % 3 === 0 ? 500 : 300) : 400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold mb-2">{image.title}</h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {image.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {image.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {currentIndex > 0 && (
              <button
                className="absolute left-4 text-white/80 hover:text-white p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {currentIndex < filteredImages.length - 1 && (
              <button
                className="absolute right-4 text-white/80 hover:text-white p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRightIcon className="w-8 h-8" />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold mb-2">{selectedImage.title}</h3>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    {selectedImage.views} views
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    {selectedImage.likes} likes
                  </span>
                  <span className="capitalize">{selectedImage.category}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
