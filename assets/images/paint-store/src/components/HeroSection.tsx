'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a2e]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-[#d4af37]" size={24} />
              <span className="text-[#d4af37] font-semibold tracking-wider uppercase">
                Premium Paint Collection
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <span className="block text-gold-gradient">Living Space</span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-lg">
              Discover our exclusive collection of premium paints from 10+ renowned brands. 
              Create the perfect ambiance with colors that inspire.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-luxury inline-flex items-center gap-2">
                Explore Collection
                <ArrowRight size={20} />
              </Link>
              <Link href="/visualizer" className="btn-outline-luxury inline-flex items-center gap-2">
                Try Visualizer
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-[#d4af37]">10+</div>
                <div className="text-white/50 text-sm">Premium Brands</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#d4af37]">500+</div>
                <div className="text-white/50 text-sm">Color Options</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#d4af37]">15K+</div>
                <div className="text-white/50 text-sm">Happy Customers</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              <Image
                src="/images/features/luxury-finish.png"
                alt="Luxury Paint Finish"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#d4af37] rounded-full opacity-20 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#d4af37] rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center">
                  <Sparkles className="text-[#1a1a2e]" size={24} />
                </div>
                <div>
                  <div className="font-bold text-[#1a1a2e]">Earn Rewards</div>
                  <div className="text-sm text-gray-500">Join our loyalty program</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-3 bg-[#d4af37] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
