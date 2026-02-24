import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Colors from '@/constants/colors';
import { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
  onPress: (brandId: string) => void;
}

export default React.memo(function BrandCard({ brand, onPress }: BrandCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(brand.id)}
      activeOpacity={0.8}
      testID={`brand-card-${brand.id}`}
    >
      <Image source={{ uri: brand.logo }} style={styles.logo} contentFit="cover" />
      <Text style={styles.name} numberOfLines={1}>{brand.name}</Text>
      <Text style={styles.tagline} numberOfLines={1}>{brand.tagline}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: 90,
    marginRight: 14,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.gold,
    marginBottom: 8,
  },
  name: {
    fontSize: 11,
    color: Colors.textPrimary,
    fontWeight: '600' as const,
    textAlign: 'center' as const,
    marginBottom: 2,
  },
  tagline: {
    fontSize: 9,
    color: Colors.textMuted,
    textAlign: 'center' as const,
  },
});
