import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Star,
    MessageCircle,
    ArrowLeft,
    Droplets,
    Ruler,
    Layers,
    ShieldCheck,
    ChevronRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { getProductById } from '@/mocks/products';
import { openWhatsAppForProduct, openWhatsApp } from '@/utils/whatsapp';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const product = getProductById(id ?? '');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    if (!product) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Stack.Screen options={{ headerShown: false }} />
                <Text style={styles.errorText}>Product not found</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backLink}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageSection}>
                    <Image source={{ uri: product.image }} style={styles.productImage} contentFit="cover" />
                    <LinearGradient
                        colors={['rgba(10,10,10,0.6)', 'transparent', 'transparent', Colors.background]}
                        style={styles.imageGradient}
                    />

                    <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <ArrowLeft size={20} color={Colors.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.topWhatsApp}
                            onPress={() => openWhatsAppForProduct(product.name, product.brandName)}
                        >
                            <MessageCircle size={18} color="#fff" fill="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.colorBadge, { backgroundColor: product.colorHex }]}>
                        <View style={styles.colorBadgeInner} />
                    </View>
                </View>

                <Animated.View
                    style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
                >
                    <Text style={styles.brandLabel}>{product.brandName}</Text>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.colorDetail}>
                        {product.colorName} · {product.finish} Finish
                    </Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
                        {product.originalPrice && (
                            <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
                        )}
                        {discount > 0 && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>{discount}% OFF</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.ratingSection}>
                        <View style={styles.starsRow}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={16}
                                    color={Colors.gold}
                                    fill={star <= Math.floor(product.rating) ? Colors.gold : 'transparent'}
                                />
                            ))}
                        </View>
                        <Text style={styles.ratingText}>
                            {product.rating} · {product.reviewCount.toLocaleString()} reviews
                        </Text>
                    </View>

                    <View style={styles.specGrid}>
                        <View style={styles.specItem}>
                            <Droplets size={18} color={Colors.gold} />
                            <Text style={styles.specValue}>{product.size}</Text>
                            <Text style={styles.specLabel}>Size</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Ruler size={18} color={Colors.gold} />
                            <Text style={styles.specValue}>{product.coverage}</Text>
                            <Text style={styles.specLabel}>sq.ft/L</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Layers size={18} color={Colors.gold} />
                            <Text style={styles.specValue}>{product.finish}</Text>
                            <Text style={styles.specLabel}>Finish</Text>
                        </View>
                        <View style={styles.specItem}>
                            <ShieldCheck size={18} color={Colors.gold} />
                            <Text style={styles.specValue}>{product.inStock ? 'Yes' : 'No'}</Text>
                            <Text style={styles.specLabel}>In Stock</Text>
                        </View>
                    </View>

                    <View style={styles.descSection}>
                        <Text style={styles.descTitle}>About This Product</Text>
                        <Text style={styles.descText}>{product.description}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.enquireBtn}
                        onPress={() => openWhatsAppForProduct(product.name, product.brandName)}
                        activeOpacity={0.8}
                    >
                        <MessageCircle size={20} color="#fff" fill="#fff" />
                        <View>
                            <Text style={styles.enquireBtnText}>Enquire on WhatsApp</Text>
                            <Text style={styles.enquireBtnSub}>Get pricing & availability instantly</Text>
                        </View>
                        <ChevronRight size={18} color="#fff" style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.calcLink}
                        onPress={() => router.push('/(tabs)/calculator' as any)}
                        activeOpacity={0.8}
                    >
                        <Ruler size={16} color={Colors.gold} />
                        <Text style={styles.calcLinkText}>Calculate how much you need</Text>
                        <ChevronRight size={16} color={Colors.gold} />
                    </TouchableOpacity>

                    <View style={{ height: insets.bottom + 20 }} />
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: Colors.textMuted,
        marginBottom: 12,
    },
    backLink: {
        fontSize: 14,
        color: Colors.gold,
        fontWeight: '600' as const,
    },
    imageSection: {
        height: 360,
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(30,30,30,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topWhatsApp: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.whatsapp,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorBadge: {
        position: 'absolute',
        bottom: -20,
        alignSelf: 'center',
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 4,
        borderColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    colorBadgeInner: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 32,
    },
    brandLabel: {
        fontSize: 11,
        color: Colors.gold,
        fontWeight: '700' as const,
        textTransform: 'uppercase' as const,
        letterSpacing: 2,
        textAlign: 'center' as const,
        marginBottom: 6,
    },
    productName: {
        fontSize: 24,
        fontWeight: '800' as const,
        color: Colors.textPrimary,
        textAlign: 'center' as const,
        marginBottom: 4,
    },
    colorDetail: {
        fontSize: 13,
        color: Colors.textSecondary,
        textAlign: 'center' as const,
        marginBottom: 16,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 12,
    },
    price: {
        fontSize: 28,
        fontWeight: '800' as const,
        color: Colors.textPrimary,
    },
    originalPrice: {
        fontSize: 16,
        color: Colors.textMuted,
        textDecorationLine: 'line-through' as const,
    },
    discountBadge: {
        backgroundColor: Colors.error,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    discountText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700' as const,
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 2,
    },
    ratingText: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    specGrid: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    specItem: {
        flex: 1,
        alignItems: 'center',
        gap: 6,
    },
    specValue: {
        fontSize: 14,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
    },
    specLabel: {
        fontSize: 10,
        color: Colors.textMuted,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.5,
    },
    descSection: {
        marginBottom: 24,
    },
    descTitle: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    descText: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
    enquireBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: Colors.whatsapp,
        padding: 18,
        borderRadius: 16,
        marginBottom: 12,
    },
    enquireBtnText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#fff',
    },
    enquireBtnSub: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 1,
    },
    calcLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.card,
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    calcLinkText: {
        flex: 1,
        fontSize: 14,
        color: Colors.textPrimary,
        fontWeight: '500' as const,
    },
});
