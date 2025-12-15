"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Milk, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const heroImages = [
  { src: "/images/Homepage slider/Farm-drone image.jpg", alt: "Prime Agro Farm drone view" },
  { src: "/images/Homepage slider/Cattle Breeding.jpg", alt: "Cattle breeding" },
  { src: "/images/Homepage slider/Agro-Tourism.jpg", alt: "Agro-tourism" },
  { src: "/images/Homepage slider/Agro-Tourism-scaled.jpg", alt: "Farm tourism facilities" },
  { src: "/images/Homepage slider/Milk Production.jpg", alt: "Milk production" },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] gradient-green text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Award className="w-4 h-4 text-gold-accent" />
              Uganda&apos;s Best Farmer 2025
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to Prime Agro Farm
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
              Uganda&apos;s leading integrated dairy company, representing a significant investment of over 1 billion UGX in modern agricultural innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="btn-primary bg-white text-primary-green hover:bg-mint-green group">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-secondary group">
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {heroImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" priority={index === 0} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl z-40"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center">
                  <Milk className="w-6 h-6 text-primary-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-green">500+</p>
                  <p className="text-sm text-muted-foreground">Dairy Cattle</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl z-40"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-green">250</p>
                  <p className="text-sm text-muted-foreground">Acres</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fafdf8"/>
        </svg>
      </div>
    </section>
  );
}
