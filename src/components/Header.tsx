"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    submenu: [
      { href: "/services#dairy", label: "Dairy Farming" },
      { href: "/services#silage", label: "Silage & Hay" },
      { href: "/services#training", label: "Training Workshops" },
    ],
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg-primary-green text-white py-2 text-sm hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+256700123456" className="flex items-center gap-2 hover:text-mint-green transition-colors">
              <Phone className="w-4 h-4" />
              +256 700 123 456
            </a>
            <a href="mailto:info@prime-agrofarms.com" className="flex items-center gap-2 hover:text-mint-green transition-colors">
              <Mail className="w-4 h-4" />
              info@prime-agrofarms.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Zirobwe, Luweero District, Uganda</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white"
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-32 h-16">
                <Image
                  src="/images/logo/Prime LOGO.png"
                  alt="Prime Agro Farm Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.submenu && setActiveSubmenu(link.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-foreground hover:text-primary-green font-medium transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  <AnimatePresence>
                    {link.submenu && activeSubmenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 bg-white rounded-lg shadow-xl border border-border py-2 min-w-[200px]"
                      >
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="block px-4 py-2 text-foreground hover:bg-secondary hover:text-primary-green transition-colors"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link href="/contact" className="btn-primary text-sm">
                Get in Touch
              </Link>
            </div>

            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="container-custom py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-foreground hover:bg-secondary hover:text-primary-green rounded-lg transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.submenu && (
                      <div className="pl-4 space-y-1">
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary-green transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4">
                  <Link
                    href="/contact"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}