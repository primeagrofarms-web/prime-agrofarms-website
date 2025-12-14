"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Target, Eye, Heart, Award, MapPin, Users, Milk, Calendar, Facebook, Twitter, Linkedin, Instagram, MessageCircle, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To transform Uganda's agricultural landscape through innovative dairy farming practices, sustainable methods, and community empowerment, while delivering premium quality dairy products to our customers.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To become East Africa's leading integrated dairy company, setting the standard for excellence in agricultural innovation, environmental sustainability, and farmer training.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Excellence in everything we do, sustainability in our farming practices, community empowerment through training, and integrity in all our business relationships.",
  },
];

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

const ceo = {
  name: "Sebastian Rutah Ngambwa",
  title: "Founder & CEO",
  bio: "Sebastian Rutah Ngambwa is a visionary agricultural entrepreneur who founded Prime Agro Farm in 2012. Under his leadership, the farm has grown from a small dairy operation to Uganda's leading integrated dairy company. His dedication to modern farming practices and community development earned him the prestigious Uganda's Best Farmer Award in 2025.",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  socials: {
    whatsapp: "https://wa.me/256700123456",
    twitter: "https://twitter.com/sebastianrutah",
    linkedin: "https://linkedin.com/in/sebastianrutah",
    facebook: "https://facebook.com/sebastianrutah",
  },
};

const leaders = [
  {
    name: "Sarah Nakato",
    title: "Operations Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "John Mukasa",
    title: "Head of Dairy Production",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Grace Achieng",
    title: "Training & Development Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Peter Ssempijja",
    title: "Agricultural Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    socials: { linkedin: "#", twitter: "#" },
  },
];

const achievements = [
  { year: "2025", title: "Uganda's Best Farmer Award", description: "Sebastian Rutah Ngambwa recognized for outstanding contributions to agricultural excellence." },
  { year: "2023", title: "Dairy Excellence Award", description: "Recognized for highest quality milk production standards in Central Uganda." },
  { year: "2021", title: "Community Impact Award", description: "Honored for training over 1,000 local farmers in modern agricultural techniques." },
  { year: "2020", title: "Company Incorporation", description: "Prime Agro Farm Limited officially incorporated as a limited company." },
];

const stats = [
  { icon: Milk, value: "500+", label: "Dairy Cattle" },
  { icon: MapPin, value: "250", label: "Acres of Land" },
  { icon: Calendar, value: "2012", label: "Year Founded" },
  { icon: Users, value: "50+", label: "Employees" },
];

export default function AboutPage() {
  const [ceoData, setCeoData] = useState<Leader | null>(null);
  const [teamLeaders, setTeamLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from("leaders")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data) {
        const ceo = data.find((leader) => leader.is_ceo);
        const others = data.filter((leader) => !leader.is_ceo);
        setCeoData(ceo || null);
        setTeamLeaders(others);
      }
    } catch (error) {
      console.error("Error fetching leaders:", error);
    } finally {
      setLoading(false);
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
              <span className="text-white">About Us</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Prime Agro Farm</h1>
            <p className="text-lg text-white/90">
              Discover our story, mission, and the passionate team behind Uganda&apos;s leading integrated dairy company.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Prime Agro Farm Limited was founded in 2012 by Sebastian Rutah Ngambwa with a vision to transform Uganda&apos;s agricultural landscape. What started as a small dairy operation in Zirobwe, Luweero District, has grown into one of East Africa&apos;s most innovative integrated dairy companies.
                </p>
                <p>
                  With an investment exceeding 1 billion UGX, we have developed 250 acres of land into a state-of-the-art agricultural facility featuring modern dairy farming infrastructure, automated milking systems, and comprehensive training facilities.
                </p>
                <p>
                  Our commitment to excellence was recognized when our founder received Uganda&apos;s Best Farmer Award in 2025, a testament to our dedication to agricultural innovation and sustainable farming practices.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800"
                  alt="Prime Agro Farm Overview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <p className="text-3xl font-bold text-primary-green">1B+</p>
                <p className="text-muted-foreground">UGX Investment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-green/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary-green" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-primary-green">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
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
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mission, Vision & Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The guiding principles that drive our commitment to agricultural excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-border text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-green to-accent-green flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
              Our Leadership
            </h2>
            <p className="text-muted-foreground text-lg">
              Meet the dedicated team driving Prime Agro Farm&apos;s success.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading leadership team...</p>
            </div>
          ) : (
            <>
              {ceoData && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-xl mb-12"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-square max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden">
                      <Image
                        src={ceoData.image_url}
                        alt={ceoData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 bg-gold-accent/10 text-gold-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Award className="w-4 h-4" />
                        CEO
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{ceoData.name}</h3>
                      <p className="text-primary-green font-medium mb-4">{ceoData.position}</p>
                      <p className="text-muted-foreground leading-relaxed mb-6">{ceoData.description}</p>
                      <div className="flex gap-3">
                        {ceoData.whatsapp_link && (
                          <a href={ceoData.whatsapp_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors">
                            <MessageCircle className="w-5 h-5" />
                          </a>
                        )}
                        {ceoData.twitter_link && (
                          <a href={ceoData.twitter_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {ceoData.linkedin_link && (
                          <a href={ceoData.linkedin_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {teamLeaders.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamLeaders.map((leader, index) => (
                    <motion.div
                      key={leader.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={leader.image_url}
                          alt={leader.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-bold text-foreground">{leader.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{leader.position}</p>
                        <div className="flex justify-center gap-2">
                          {leader.whatsapp_link && (
                            <a href={leader.whatsapp_link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors">
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}
                          {leader.linkedin_link && (
                            <a href={leader.linkedin_link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {leader.twitter_link && (
                            <a href={leader.twitter_link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors">
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
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
              Our Achievements
            </h2>
            <p className="text-muted-foreground text-lg">
              Milestones that mark our journey of excellence in agriculture.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-green to-accent-green flex items-center justify-center text-white font-bold">
                    {achievement.year}
                  </div>
                  {index < achievements.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Location
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Prime Agro Farm is strategically located in Zirobwe Town Council, Luweero District, Uganda. Our 250-acre facility is easily accessible from Kampala and features modern infrastructure for dairy production and training.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Physical Address</p>
                    <p className="text-muted-foreground">Zirobwe Town Council, Luweero District, Uganda</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="https://maps.google.com/?q=Zirobwe,Luweero,Uganda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.51234567890!2d32.5!3d0.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dc0b0b0b0b0b0%3A0x0!2sZirobwe%2C%20Uganda!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}