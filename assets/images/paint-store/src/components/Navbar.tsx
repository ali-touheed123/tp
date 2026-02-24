'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Calculator, Palette, Gift, Phone } from 'lucide-react';
import { useStore } from '@/store';
import WhatsAppButton from './WhatsAppButton';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useStore((state) => state.getCartCount());

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/brands', label: 'Brands' },
    { href: '/calculator', label: 'Paint Calculator', icon: Calculator },
    { href: '/visualizer', label: 'Visualizer', icon: Palette },
    { href: '/loyalty', label: 'Loyalty', icon: Gift },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo of website.png"
              alt="Paint Store Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-gold-gradient hidden sm:block">
              PAINT PALACE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#d4af37] transition-colors font-medium flex items-center gap-1"
              >
                {link.icon && <link.icon size={16} />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <WhatsAppButton variant="icon" className="hidden sm:flex" />
            
            <Link
              href="/cart"
              className="relative p-2 text-white hover:text-[#d4af37] transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#1a1a2e] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/loyalty"
              className="p-2 text-white hover:text-[#d4af37] transition-colors hidden sm:block"
            >
              <User size={24} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-white/10 mt-2 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/80 hover:text-[#d4af37] transition-colors font-medium flex items-center gap-2 py-2"
                >
                  {link.icon && <link.icon size={18} />}
                  {link.label}
                </Link>
              ))}
              <WhatsAppButton variant="full" className="mt-4" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
