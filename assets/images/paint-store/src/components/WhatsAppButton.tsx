'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/data';

interface WhatsAppButtonProps {
  variant?: 'icon' | 'full' | 'floating' | 'product';
  productName?: string;
  className?: string;
}

export default function WhatsAppButton({
  variant = 'full',
  productName,
  className = '',
}: WhatsAppButtonProps) {
  const getMessage = () => {
    if (productName) {
      return encodeURIComponent(`Hi! I'm interested in ${productName}. Can you provide more details?`);
    }
    return encodeURIComponent('Hi! I would like to inquire about your paint products.');
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${getMessage()}`;

  if (variant === 'icon') {
    return (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-2 bg-[#25d366] text-white rounded-full hover:bg-[#128c7e] transition-all hover:scale-110 ${className}`}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
      </a>
    );
  }

  if (variant === 'floating') {
    return (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 p-4 bg-[#25d366] text-white rounded-full shadow-lg hover:bg-[#128c7e] transition-all hover:scale-110 animate-pulse-gold ${className}`}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    );
  }

  if (variant === 'product') {
    return (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2 bg-[#25d366] text-white text-sm font-medium rounded-full hover:bg-[#128c7e] transition-all hover:scale-105 ${className}`}
      >
        <MessageCircle size={16} />
        <span>Inquire</span>
      </a>
    );
  }

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp ${className}`}
    >
      <MessageCircle size={20} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
