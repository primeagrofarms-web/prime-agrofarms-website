"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Milk, Sprout, GraduationCap, ChevronRight } from "lucide-react";

const services = [
  {
    id: "dairy",
    icon: Milk,
    title: "Dairy Farming",
    description: "State-of-the-art automated milking systems with robotic technology ensuring highest quality milk production.",
    link: "/services#dairy",
  },
  {
    id: "silage",
    icon: Sprout,
    title: "Silage & Hay Production",
    description: "High-moisture fermented forage providing year-round quality feed for optimal livestock nutrition.",
    link: "/services#silage",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training Workshops",
    description: "Hands-on experience in modern farming techniques and agricultural business management.",
    link: "/services#training",
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive agricultural solutions built on decades of expertise and modern innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-border transition-all duration-300"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-green to-accent-green flex items-center justify-center mb-6"
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
              <Link
                href={service.link}
                className="inline-flex items-center text-primary-green font-semibold group"
              >
                Learn More
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
