import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Clock } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo of website.png"
                alt="Paint Store Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-gold-gradient">
                PAINT PALACE
              </span>
            </Link>
            <p className="text-white/70 mb-6">
              Your premium destination for quality paints. We bring colors to life with our extensive collection from top brands.
            </p>
            <WhatsAppButton variant="full" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#d4af37]">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/brands', label: 'Our Brands' },
                { href: '/calculator', label: 'Paint Calculator' },
                { href: '/visualizer', label: 'Color Visualizer' },
                { href: '/loyalty', label: 'Loyalty Program' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#d4af37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#d4af37]">Categories</h3>
            <ul className="space-y-3">
              {[
                { href: '/category/decorative', label: 'Decorative Paints' },
                { href: '/category/industrial', label: 'Industrial Paints' },
                { href: '/category/auto', label: 'Auto Finishes' },
                { href: '/category/projects', label: 'Project Solutions' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#d4af37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#d4af37]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#d4af37] flex-shrink-0 mt-1" />
                <span className="text-white/70">
                  123 Paint Street, Color District,<br />
                  Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#d4af37] flex-shrink-0" />
                <a href="tel:+923001234567" className="text-white/70 hover:text-[#d4af37]">
                  +92 300 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#d4af37] flex-shrink-0" />
                <a href="mailto:info@paintpalace.com" className="text-white/70 hover:text-[#d4af37]">
                  info@paintpalace.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-[#d4af37] flex-shrink-0" />
                <span className="text-white/70">
                  Mon - Sat: 9:00 AM - 9:00 PM
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#1a1a2e] transition-all"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#1a1a2e] transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#1a1a2e] transition-all"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Paint Palace. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/50 hover:text-[#d4af37] text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-[#d4af37] text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
