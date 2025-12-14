"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News & Updates" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const services = [
  { href: "/services#dairy", label: "Dairy Farming" },
  { href: "/services#silage", label: "Silage Production" },
  { href: "/services#training", label: "Training Workshops" },
  { href: "/services#consultation", label: "Farm Consultation" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/primeagrofarm", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/primeagrofarm", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/primeagrofarm", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/primeagrofarm", label: "LinkedIn" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-primary-green text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-xl">PA</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Prime Agro Farm</h3>
                <p className="text-sm text-white/70">Uganda&apos;s Leading Dairy</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Uganda&apos;s leading integrated dairy company, representing a significant investment in modern agricultural innovation and sustainable farming practices.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-mint-green flex-shrink-0" />
                <span className="text-white/80 text-sm">Zirobwe Town Council, Luweero District, Uganda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-mint-green flex-shrink-0" />
                <a href="tel:+256701945174" className="text-white/80 hover:text-white transition-colors text-sm">
                  +256 701 945174
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-mint-green flex-shrink-0" />
                <a href="mailto:primeagrofarmslimited@gmail.com" className="text-white/80 hover:text-white transition-colors text-sm break-all">
                  primeagrofarmslimited@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-mint-green flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p>Sun: By appointment</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-white/80 mb-4 text-sm">
              Subscribe to get updates and news about our farm activities.
            </p>
            {subscribed ? (
              <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-center">
                <p className="text-sm">✓ Successfully subscribed!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-white text-primary-green hover:bg-white/90"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} Prime Agro Farm Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}