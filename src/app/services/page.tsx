"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Milk, Sprout, GraduationCap, CheckCircle, ArrowRight, ChevronRight, Settings, Users, Award, Clock, Target, Zap } from "lucide-react";

const services = [
  {
    id: "dairy",
    icon: Milk,
    title: "Dairy Farming",
    subtitle: "State-of-the-Art Milk Production",
    description: "Our dairy farming operations utilize cutting-edge technology and sustainable practices to produce high-quality milk. With over 500 dairy cattle and automated milking systems, we ensure consistent quality and maximum efficiency.",
    image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=800",
    features: [
      "Automated milking systems with robotic technology",
      "Precision feeding and nutrition management",
      "Real-time health monitoring systems",
      "Climate-controlled housing facilities",
      "Strict quality control protocols",
      "Sustainable waste management",
    ],
    stats: [
      { value: "500+", label: "Dairy Cattle" },
      { value: "24/7", label: "Monitoring" },
      { value: "99%", label: "Quality Rate" },
    ],
  },
  {
    id: "silage",
    icon: Sprout,
    title: "Silage & Hay Production",
    subtitle: "Year-Round Quality Feed Solutions",
    description: "We produce high-moisture fermented forage (silage) and quality hay to ensure optimal nutrition for livestock throughout the year. Our advanced preservation techniques maintain nutritional value and reduce wastage.",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800",
    features: [
      "High-moisture fermented forage production",
      "Quality hay baling and storage",
      "Advanced preservation techniques",
      "Year-round feed availability",
      "Nutritional optimization",
      "Bulk supply for farms",
    ],
    stats: [
      { value: "1000+", label: "Tons Annually" },
      { value: "365", label: "Days Supply" },
      { value: "95%", label: "Nutrient Retention" },
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training Workshops",
    subtitle: "Empowering Agricultural Excellence",
    description: "Our comprehensive training programs provide hands-on experience in modern farming techniques, agricultural business management, and sustainable practices. We've trained over 1,000 farmers to date.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    features: [
      "Hands-on practical training sessions",
      "Modern farming techniques education",
      "Agricultural business management",
      "Sustainable farming practices",
      "Equipment operation training",
      "Certification programs",
    ],
    stats: [
      { value: "1000+", label: "Farmers Trained" },
      { value: "12+", label: "Programs" },
      { value: "98%", label: "Success Rate" },
    ],
  },
];

const whyChooseUs = [
  { icon: Award, title: "Award-Winning Excellence", description: "Recognized as Uganda's Best Farmer 2025" },
  { icon: Settings, title: "Modern Technology", description: "State-of-the-art automated systems" },
  { icon: Users, title: "Expert Team", description: "50+ dedicated professionals" },
  { icon: Target, title: "Quality Focus", description: "Strict quality control standards" },
  { icon: Zap, title: "Innovation", description: "Continuous improvement mindset" },
  { icon: Clock, title: "Experience", description: "13+ years in agriculture" },
];

export default function ServicesPage() {
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
              <span className="text-white">Services</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-white/90">
              Comprehensive agricultural solutions built on decades of expertise, modern technology, and sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? "bg-background" : "bg-secondary"}`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="inline-flex items-center gap-2 bg-primary-green/10 text-primary-green px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <service.icon className="w-4 h-4" />
                  {service.subtitle}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {service.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-primary-green">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="btn-primary">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-green to-accent-green rounded-full flex items-center justify-center shadow-xl">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding gradient-green text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Prime Agro Farm?
            </h2>
            <p className="text-white/90 text-lg">
              Experience the difference that comes with working with Uganda&apos;s leading agricultural company.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you need quality dairy products, feed solutions, or professional training, we&apos;re here to help. Contact us today to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/gallery" className="btn-outline">
                View Our Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
