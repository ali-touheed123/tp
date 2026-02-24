import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { openWhatsApp } from '@/utils/whatsapp';

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  style?: ViewStyle;
  compact?: boolean;
}

export default React.memo(function WhatsAppButton({ message, label, style, compact }: WhatsAppButtonProps) {
  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compactButton, style]}
        onPress={() => openWhatsApp(message)}
        activeOpacity={0.7}
        testID="whatsapp-button-compact"
      >
        <MessageCircle size={16} color="#fff" fill="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => openWhatsApp(message)}
      activeOpacity={0.7}
      testID="whatsapp-button"
    >
      <MessageCircle size={18} color="#fff" fill="#fff" />
      <Text style={styles.label}>{label ?? 'Chat with us'}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whatsapp,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  compactButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
