import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Milk, Sprout, GraduationCap, ChevronRight } from "lucide-react";
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import NewsSection from "@/components/NewsSection";

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

async function getNews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/news?limit=3`, { 
      cache: 'no-store',
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

function ServicesSection() {
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

function VideoTourSection() {
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

function CTASection() {
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

export default async function HomePage() {
  const news = await getNews();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <VideoTourSection />
      <ServicesSection />
      <Suspense fallback={<div className="section-padding bg-secondary" />}>
        <NewsSection news={news} />
      </Suspense>
      <CTASection />
    </>
  );
}
