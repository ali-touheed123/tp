import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Star, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { PaintProduct } from '@/types';
import { openWhatsAppForProduct } from '@/utils/whatsapp';

interface ProductCardProps {
  product: PaintProduct;
  compact?: boolean;
}

export default React.memo(function ProductCard({ product, compact }: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: '/product/[id]' as any, params: { id: product.id } });
  };

  const handleWhatsApp = () => {
    openWhatsAppForProduct(product.name, product.brandName);
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        onPress={handlePress}
        activeOpacity={0.8}
        testID={`product-card-${product.id}`}
      >
        <View style={[styles.compactColorStrip, { backgroundColor: product.colorHex }]} />
        <Image source={{ uri: product.image }} style={styles.compactImage} contentFit="cover" />
        <View style={styles.compactInfo}>
          <Text style={styles.compactBrand}>{product.brandName}</Text>
          <Text style={styles.compactName} numberOfLines={1}>{product.name}</Text>
          <View style={styles.compactBottom}>
            <Text style={styles.compactPrice}>₹{product.price.toLocaleString()}</Text>
            <TouchableOpacity onPress={handleWhatsApp} style={styles.miniWhatsApp} activeOpacity={0.7}>
              <MessageCircle size={14} color="#fff" fill="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
      testID={`product-card-${product.id}`}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
        <View style={[styles.colorDot, { backgroundColor: product.colorHex }]}>
          <View style={styles.colorDotInner} />
        </View>
        {product.originalPrice && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.brandName}>{product.brandName}</Text>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.colorLabel}>{product.colorName} · {product.finish}</Text>
        <View style={styles.ratingRow}>
          <Star size={12} color={Colors.gold} fill={Colors.gold} />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviews}>({product.reviewCount})</Text>
        </View>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleWhatsApp} style={styles.whatsAppBtn} activeOpacity={0.7}>
            <MessageCircle size={15} color="#fff" fill="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    width: 200,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  colorDot: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  saleText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  info: {
    padding: 12,
  },
  brandName: {
    fontSize: 10,
    color: Colors.gold,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600' as const,
    lineHeight: 18,
    marginBottom: 4,
  },
  colorLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  rating: {
    fontSize: 11,
    color: Colors.textPrimary,
    fontWeight: '600' as const,
  },
  reviews: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '700' as const,
  },
  originalPrice: {
    fontSize: 11,
    color: Colors.textMuted,
    textDecorationLine: 'line-through' as const,
  },
  whatsAppBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    height: 100,
  },
  compactColorStrip: {
    width: 4,
  },
  compactImage: {
    width: 90,
    height: '100%',
  },
  compactInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  compactBrand: {
    fontSize: 9,
    color: Colors.gold,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  },
  compactName: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600' as const,
  },
  compactBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactPrice: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '700' as const,
  },
  miniWhatsApp: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
