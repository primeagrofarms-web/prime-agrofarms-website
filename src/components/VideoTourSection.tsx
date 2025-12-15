"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function VideoTourSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Take a Virtual Farm Tour
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience our state-of-the-art facilities and see how we&apos;re revolutionizing dairy farming in Uganda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://www.youtube.com/embed/BleOGM91Jos"
            title="Prime Agro Farm Tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/contact" className="btn-primary group">
            Schedule a Farm Visit
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
