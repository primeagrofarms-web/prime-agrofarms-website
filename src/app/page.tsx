"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Milk, Sprout, GraduationCap, Award, Users, MapPin, TrendingUp, Play, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [
  { icon: Milk, value: 500, suffix: "+", label: "Dairy Cattle" },
  { icon: MapPin, value: 250, suffix: "", label: "Acres of Land" },
  { icon: TrendingUp, value: 13, suffix: "", label: "Years of Excellence" },
  { icon: Users, value: 50, suffix: "+", label: "Employees" },
];

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

const news = [
  {
    id: 1,
    title: "Prime Agro Farm Wins Uganda's Best Farmer 2025",
    excerpt: "Sebastian Rutah Ngambwa recognized for outstanding contributions to agricultural excellence.",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600",
    date: "2025-01-15",
    slug: "best-farmer-2025",
  },
  {
    id: 2,
    title: "New Automated Milking System Installation",
    excerpt: "Modernizing our dairy operations with cutting-edge robotic milking technology.",
    image: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=600",
    date: "2024-12-01",
    slug: "new-milking-system",
  },
  {
    id: 3,
    title: "Community Training Program Launch",
    excerpt: "Empowering local farmers with modern agricultural techniques and sustainable practices.",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=600",
    date: "2024-11-15",
    slug: "community-training",
  },
];

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count}</span>;
}

export default function HomePage() {
  return (
    <>
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
                Welcome to{" "}
                <span className="bg-gradient-to-r from-white via-mint-green to-light-green bg-clip-text text-transparent">
                  Prime Agro Farm
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
                Uganda&apos;s leading integrated dairy company, representing a significant investment of over 1 billion UGX in modern agricultural innovation and sustainable farming practices in East Africa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-primary bg-white text-primary-green hover:bg-mint-green">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/contact" className="btn-secondary">
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800"
                  alt="Prime Agro Farm dairy cattle grazing"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl"
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
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl"
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

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-green/10 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary-green" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-primary-green">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Prime Agro Farm Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

          <div className="text-center mt-8">
            <Link href="/contact" className="btn-primary">
              Schedule a Farm Visit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

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
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-border"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-green to-accent-green flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-primary-green font-semibold hover:gap-3 transition-all gap-2"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Latest News
              </h2>
              <p className="text-muted-foreground">Stay updated with our farm activities</p>
            </div>
            <Link href="/news" className="btn-outline">
              View All News
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{item.excerpt}</p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center text-primary-green font-semibold hover:gap-3 transition-all gap-2"
                  >
                    Read More
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

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
              <Link href="/contact" className="btn-primary bg-white text-primary-green hover:bg-mint-green">
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/services" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
