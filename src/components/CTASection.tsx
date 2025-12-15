"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding gradient-green text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Whether you&apos;re interested in our dairy products, training programs, or farm consultation services, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-primary-green hover:bg-mint-green group">
              Contact Us Today
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className="btn-secondary group">
              Explore Services
              <span className="inline-block transition-transform group-hover:scale-110"></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
