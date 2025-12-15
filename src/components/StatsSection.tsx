"use client";

import { motion } from "framer-motion";
import { Milk, MapPin, TrendingUp, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const stats = [
  { icon: Milk, value: 500, suffix: "+", label: "Dairy Cattle" },
  { icon: MapPin, value: 250, suffix: "", label: "Acres of Land" },
  { icon: TrendingUp, value: 13, suffix: "", label: "Years of Excellence" },
  { icon: Users, value: 50, suffix: "+", label: "Employees" },
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

export default function StatsSection() {
  return (
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
  );
}
