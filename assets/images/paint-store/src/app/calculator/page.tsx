'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Paintbrush, Info, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface RoomDimensions {
  length: number;
  width: number;
  height: number;
  doors: number;
  windows: number;
  coats: number;
}

export default function PaintCalculatorPage() {
  const [dimensions, setDimensions] = useState<RoomDimensions>({
    length: 0,
    width: 0,
    height: 0,
    doors: 0,
    windows: 0,
    coats: 2,
  });

  const [result, setResult] = useState<{
    wallArea: number;
    paintNeeded: number;
    litersNeeded: number;
  } | null>(null);

  const COVERAGE_PER_LITER = 120; // sq ft per liter
  const DOOR_AREA = 21; // sq ft per door
  const WINDOW_AREA = 15; // sq ft per window

  const calculatePaint = () => {
    const { length, width, height, doors, windows, coats } = dimensions;

    // Calculate wall area (perimeter * height)
    const perimeter = 2 * (length + width);
    const totalWallArea = perimeter * height;

    // Subtract doors and windows
    const doorArea = doors * DOOR_AREA;
    const windowArea = windows * WINDOW_AREA;
    const paintableArea = totalWallArea - doorArea - windowArea;

    // Calculate paint needed (with coats)
    const totalAreaWithCoats = paintableArea * coats;
    const litersNeeded = Math.ceil(totalAreaWithCoats / COVERAGE_PER_LITER);

    setResult({
      wallArea: paintableArea,
      paintNeeded: totalAreaWithCoats,
      litersNeeded,
    });
  };

  const resetCalculator = () => {
    setDimensions({
      length: 0,
      width: 0,
      height: 0,
      doors: 0,
      windows: 0,
      coats: 2,
    });
    setResult(null);
  };

  const handleInputChange = (field: keyof RoomDimensions, value: string) => {
    const numValue = parseFloat(value) || 0;
    setDimensions((prev) => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#1a1a2e] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#d4af37] rounded-full mb-6"
          >
            <Calculator className="text-[#1a1a2e]" size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Paint Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Calculate exactly how much paint you need for your project. 
            No more guessing or wastage.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6 flex items-center gap-3">
              <Paintbrush className="text-[#d4af37]" size={28} />
              Room Dimensions
            </h2>

            <div className="space-y-6">
              {/* Room Size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (ft)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dimensions.length || ''}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none"
                    placeholder="e.g., 15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (ft)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dimensions.width || ''}
                    onChange={(e) => handleInputChange('width', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none"
                    placeholder="e.g., 12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (ft)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dimensions.height || ''}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none"
                  placeholder="e.g., 10"
                />
              </div>

              {/* Doors and Windows */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Doors
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dimensions.doors || ''}
                    onChange={(e) => handleInputChange('doors', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none"
                    placeholder="e.g., 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Windows
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dimensions.windows || ''}
                    onChange={(e) => handleInputChange('windows', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none"
                    placeholder="e.g., 2"
                  />
                </div>
              </div>

              {/* Coats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Coats
                </label>
                <select
                  value={dimensions.coats}
                  onChange={(e) => handleInputChange('coats', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] outline-none"
                >
                  <option value={1}>1 Coat</option>
                  <option value={2}>2 Coats (Recommended)</option>
                  <option value={3}>3 Coats</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculatePaint}
                  className="flex-1 btn-luxury flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  Calculate
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Result Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">
                Calculation Results
              </h2>

              {result ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500">Paintable Wall Area</p>
                      <p className="text-2xl font-bold text-[#1a1a2e]">
                        {result.wallArea.toFixed(0)} sq ft
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500">Total with Coats</p>
                      <p className="text-2xl font-bold text-[#1a1a2e]">
                        {result.paintNeeded.toFixed(0)} sq ft
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#d4af37]/10 border-2 border-[#d4af37] rounded-xl p-6 text-center">
                    <p className="text-sm text-[#1a1a2e] mb-1">You Need Approximately</p>
                    <p className="text-5xl font-bold text-[#d4af37]">
                      {result.litersNeeded} Liters
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Based on {COVERAGE_PER_LITER} sq ft coverage per liter
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                    <Info className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-sm text-blue-700">
                      This is an estimate. Actual paint needed may vary based on surface 
                      texture, paint quality, and application method. We recommend buying 
                      10% extra for touch-ups.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="text-gray-400" size={40} />
                  </div>
                  <p className="text-gray-500">
                    Enter your room dimensions and click calculate to see results
                  </p>
                </div>
              )}
            </div>

            {/* Tips Card */}
            <div className="bg-[#1a1a2e] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-4">Pro Tips</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• Always apply primer before painting for better coverage</li>
                <li>• Use 2 coats for best results and durability</li>
                <li>• Dark colors may require an additional coat</li>
                <li>• Buy all paint at once to ensure color consistency</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
