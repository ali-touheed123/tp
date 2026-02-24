'use client';

import { use, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { products, brands } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const brand = brands.find((b) => b.id === id);
  
  if (!brand) {
    notFound();
  }

  const brandProducts = useMemo(() => {
    return products.filter((p) => p.brand.toLowerCase() === brand.name.toLowerCase());
  }, [brand.name]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-[#1a1a2e] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-32 h-32 bg-white rounded-2xl p-4 flex items-center justify-center"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>
            <div className="text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {brand.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/60 text-lg mb-4"
              >
                {brand.description}
              </motion.p>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-[#d4af37] text-[#1a1a2e] text-sm font-bold px-4 py-1 rounded-full"
              >
                {brandProducts.length} Products Available
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products available for this brand yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
