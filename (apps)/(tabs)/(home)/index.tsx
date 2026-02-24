import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MessageCircle, ChevronRight, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { brands } from '@/mocks/brands';
import { getFeaturedProducts, products } from '@/mocks/products';
import ProductCard from '@/components/ProductCard';
import BrandCard from '@/components/BrandCard';
import { openWhatsApp } from '@/utils/whatsapp';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const featuredProducts = getFeaturedProducts();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleBrandPress = (brandId: string) => {
        router.push({ pathname: '/(tabs)/catalog' as any, params: { brand: brandId } });
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.storeName}>LUXE PAINTS</Text>
                    <Text style={styles.storeTagline}>Premium Color Studio</Text>
                </View>
                <TouchableOpacity
                    style={styles.headerWhatsApp}
                    onPress={() => openWhatsApp()}
                    activeOpacity={0.7}
                >
                    <MessageCircle size={20} color="#fff" fill="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=500&fit=crop' }}
                        style={styles.heroImage}
                        contentFit="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(10,10,10,0.85)', Colors.background]}
                        style={styles.heroGradient}
                    />
                    <View style={styles.heroContent}>
                        <View style={styles.heroBadge}>
                            <Sparkles size={12} color={Colors.gold} />
                            <Text style={styles.heroBadgeText}>NEW COLLECTION</Text>
                        </View>
                        <Text style={styles.heroTitle}>Transform Your{'\n'}Living Space</Text>
                        <Text style={styles.heroSubtitle}>
                            Discover 10+ premium brands with 500+ designer colors
                        </Text>
                        <TouchableOpacity
                            style={styles.heroButton}
                            onPress={() => router.push('/(tabs)/catalog' as any)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.heroButtonText}>Explore Collection</Text>
                            <ChevronRight size={16} color={Colors.background} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Our Brands</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/catalog' as any)}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={brands}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.brandsList}
                        renderItem={({ item }) => (
                            <BrandCard brand={item} onPress={handleBrandPress} />
                        )}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Products</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/catalog' as any)}>
                            <Text style={styles.seeAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={featuredProducts}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.productsList}
                        renderItem={({ item }) => <ProductCard product={item} />}
                        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Best Sellers</Text>
                    </View>
                    {products.slice(0, 4).map((product) => (
                        <View key={product.id} style={styles.bestSellerItem}>
                            <ProductCard product={product} compact />
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.ctaBanner}
                    onPress={() => openWhatsApp()}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#1a3a2a', '#0d2618']}
                        style={styles.ctaGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <MessageCircle size={28} color={Colors.whatsapp} />
                        <View style={styles.ctaContent}>
                            <Text style={styles.ctaTitle}>Need Expert Advice?</Text>
                            <Text style={styles.ctaSubtitle}>Chat with our color consultants on WhatsApp</Text>
                        </View>
                        <ChevronRight size={20} color={Colors.whatsapp} />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    storeName: {
        fontSize: 22,
        fontWeight: '800' as const,
        color: Colors.gold,
        letterSpacing: 3,
    },
    storeTagline: {
        fontSize: 11,
        color: Colors.textMuted,
        letterSpacing: 1.5,
        marginTop: 2,
    },
    headerWhatsApp: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: Colors.whatsapp,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        height: 380,
        marginHorizontal: 16,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 24,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70%',
    },
    heroContent: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
    },
    heroBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(201,169,110,0.15)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    heroBadgeText: {
        fontSize: 10,
        color: Colors.gold,
        fontWeight: '700' as const,
        letterSpacing: 1.5,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: '800' as const,
        color: Colors.white,
        lineHeight: 34,
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 18,
        marginBottom: 16,
    },
    heroButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.gold,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        alignSelf: 'flex-start',
        gap: 6,
    },
    heroButtonText: {
        fontSize: 13,
        fontWeight: '700' as const,
        color: Colors.background,
        letterSpacing: 0.5,
    },
    section: {
        marginBottom: 28,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
        letterSpacing: 0.3,
    },
    seeAll: {
        fontSize: 13,
        color: Colors.gold,
        fontWeight: '600' as const,
    },
    brandsList: {
        paddingHorizontal: 20,
    },
    productsList: {
        paddingHorizontal: 20,
    },
    bestSellerItem: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    ctaBanner: {
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 4,
    },
    ctaGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 14,
    },
    ctaContent: {
        flex: 1,
    },
    ctaTitle: {
        fontSize: 15,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    ctaSubtitle: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});
