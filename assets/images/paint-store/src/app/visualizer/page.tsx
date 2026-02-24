'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, RotateCcw, Download, Check } from 'lucide-react';
import Image from 'next/image';

const colorPalettes = [
  { name: 'Warm Neutrals', colors: ['#F5F5DC', '#E8DCC4', '#D4C4A8', '#C9B896', '#BEA97D'] },
  { name: 'Cool Blues', colors: ['#E6F2FF', '#B3D9FF', '#80C1FF', '#4DA8FF', '#1A8FFF'] },
  { name: 'Earth Tones', colors: ['#8B7355', '#A67B5B', '#C19A6B', '#D4A574', '#E7BC91'] },
  { name: 'Modern Grays', colors: ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD'] },
  { name: 'Elegant Greens', colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'] },
  { name: 'Luxe Golds', colors: ['#FFF8E7', '#FFEEBA', '#FFE066', '#FFD700', '#D4AF37'] },
  { name: 'Bold Reds', colors: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350'] },
  { name: 'Soft Purples', colors: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC'] },
];

const presetRooms = [
  { id: 'living', name: 'Living Room', image: '/images/features/modern-interior.png' },
  { id: 'bedroom', name: 'Bedroom', image: '/images/features/soft-gradient.png' },
  { id: 'exterior', name: 'Exterior', image: '/images/features/exterior-facade.png' },
  { id: 'kitchen', name: 'Kitchen', image: '/images/features/luxury-finish.png' },
];

export default function VisualizerPage() {
  const [selectedColor, setSelectedColor] = useState('#D4AF37');
  const [selectedRoom, setSelectedRoom] = useState(presetRooms[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetVisualizer = () => {
    setSelectedColor('#D4AF37');
    setSelectedRoom(presetRooms[0]);
    setCustomImage(null);
    setIntensity(50);
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
            <Palette className="text-[#1a1a2e]" size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Color Visualizer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            See how different colors look on your walls before making a decision. 
            Upload your room photo or use our presets.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-[#1a1a2e]">Room Preview</h2>
              </div>
              
              {/* Image Preview with Color Overlay */}
              <div className="relative aspect-video">
                <Image
                  src={customImage || selectedRoom.image}
                  alt="Room Preview"
                  fill
                  className="object-cover"
                />
                {/* Color Overlay */}
                <div
                  className="absolute inset-0 mix-blend-multiply transition-opacity duration-300"
                  style={{
                    backgroundColor: selectedColor,
                    opacity: intensity / 100,
                  }}
                />
              </div>

              {/* Room Presets */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-700 mb-4">Choose a Room</h3>
                <div className="grid grid-cols-4 gap-3">
                  {presetRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => {
                        setSelectedRoom(room);
                        setCustomImage(null);
                      }}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        selectedRoom.id === room.id && !customImage
                          ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                      {selectedRoom.id === room.id && !customImage && (
                        <div className="absolute inset-0 bg-[#d4af37]/20 flex items-center justify-center">
                          <Check className="text-[#d4af37]" size={24} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Upload Custom Image */}
                <div className="mt-4 flex gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-colors"
                  >
                    <Upload size={20} />
                    Upload Your Room Photo
                  </button>
                  <button
                    onClick={resetVisualizer}
                    className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Color Selection Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Selected Color */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-700 mb-4">Selected Color</h3>
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl shadow-inner border-4 border-white"
                  style={{ backgroundColor: selectedColor }}
                />
                <div>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-1 uppercase">{selectedColor}</p>
                </div>
              </div>

              {/* Intensity Slider */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Color Intensity</span>
                  <span className="text-sm text-gray-500">{intensity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>
            </div>

            {/* Color Palettes */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-700 mb-4">Color Palettes</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {colorPalettes.map((palette) => (
                  <div key={palette.name}>
                    <p className="text-xs text-gray-500 mb-2">{palette.name}</p>
                    <div className="flex gap-1">
                      {palette.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`flex-1 h-10 rounded transition-transform hover:scale-110 ${
                            selectedColor === color
                              ? 'ring-2 ring-[#1a1a2e] ring-offset-2'
                              : ''
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-[#1a1a2e] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-3">Visualizer Tips</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• Upload a well-lit photo for best results</li>
                <li>• Try multiple colors before deciding</li>
                <li>• Consider room lighting when choosing</li>
                <li>• Test colors in both day and night lighting</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
