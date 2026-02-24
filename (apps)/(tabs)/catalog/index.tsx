import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Search, X, MessageCircle, SlidersHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { brands } from '@/mocks/brands';
import { products } from '@/mocks/products';
import ProductCard from '@/components/ProductCard';
import { openWhatsApp } from '@/utils/whatsapp';
import { PaintProduct } from '@/types';

export default function CatalogScreen() {
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams<{ brand?: string }>();
    const [selectedBrand, setSelectedBrand] = useState<string>(params.brand ?? 'all');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'price_low' | 'price_high' | 'rating'>('default');
    const [showSort, setShowSort] = useState(false);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (selectedBrand !== 'all') {
            filtered = filtered.filter((p) => p.brandId === selectedBrand);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.colorName.toLowerCase().includes(q) ||
                    p.brandName.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case 'price_low':
                return [...filtered].sort((a, b) => a.price - b.price);
            case 'price_high':
                return [...filtered].sort((a, b) => b.price - a.price);
            case 'rating':
                return [...filtered].sort((a, b) => b.rating - a.rating);
            default:
                return filtered;
        }
    }, [selectedBrand, search, sortBy]);

    const renderProduct = useCallback(({ item }: { item: PaintProduct }) => (
        <View style={styles.productItem}>
            <ProductCard product={item} compact />
        </View>
    ), []);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.title}>Catalog</Text>
                        <Text style={styles.subtitle}>{filteredProducts.length} products</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.headerWhatsApp}
                        onPress={() => openWhatsApp()}
                        activeOpacity={0.7}
                    >
                        <MessageCircle size={18} color="#fff" fill="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <Search size={16} color={Colors.textMuted} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search paints, colors, brands..."
                            placeholderTextColor={Colors.textMuted}
                            value={search}
                            onChangeText={setSearch}
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <X size={16} color={Colors.textMuted} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                        style={[styles.filterBtn, showSort && styles.filterBtnActive]}
                        onPress={() => setShowSort(!showSort)}
                    >
                        <SlidersHorizontal size={16} color={showSort ? Colors.background : Colors.gold} />
                    </TouchableOpacity>
                </View>

                {showSort && (
                    <View style={styles.sortRow}>
                        {[
                            { key: 'default' as const, label: 'Default' },
                            { key: 'price_low' as const, label: 'Price ↑' },
                            { key: 'price_high' as const, label: 'Price ↓' },
                            { key: 'rating' as const, label: 'Rating' },
                        ].map((option) => (
                            <TouchableOpacity
                                key={option.key}
                                style={[styles.sortChip, sortBy === option.key && styles.sortChipActive]}
                                onPress={() => setSortBy(option.key)}
                            >
                                <Text style={[styles.sortChipText, sortBy === option.key && styles.sortChipTextActive]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <FlatList
                    data={[{ id: 'all', name: 'All Brands' }, ...brands]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.brandFilter}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.brandChip,
                                selectedBrand === item.id && styles.brandChipActive,
                            ]}
                            onPress={() => setSelectedBrand(item.id)}
                        >
                            <Text
                                style={[
                                    styles.brandChipText,
                                    selectedBrand === item.id && styles.brandChipTextActive,
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={renderProduct}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🎨</Text>
                        <Text style={styles.emptyTitle}>No products found</Text>
                        <Text style={styles.emptySubtitle}>Try adjusting your filters</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: '800' as const,
        color: Colors.textPrimary,
    },
    subtitle: {
        fontSize: 12,
        color: Colors.textMuted,
        marginTop: 2,
    },
    headerWhatsApp: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Colors.whatsapp,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 10,
        marginBottom: 12,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 44,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.textPrimary,
        height: '100%',
    },
    filterBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    filterBtnActive: {
        backgroundColor: Colors.gold,
        borderColor: Colors.gold,
    },
    sortRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 8,
        marginBottom: 12,
    },
    sortChip: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    sortChipActive: {
        backgroundColor: Colors.gold,
        borderColor: Colors.gold,
    },
    sortChipText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '600' as const,
    },
    sortChipTextActive: {
        color: Colors.background,
    },
    brandFilter: {
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    brandChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        marginRight: 8,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    brandChipActive: {
        backgroundColor: Colors.gold,
        borderColor: Colors.gold,
    },
    brandChipText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '600' as const,
    },
    brandChipTextActive: {
        color: Colors.background,
        fontWeight: '700' as const,
    },
    productList: {
        padding: 20,
    },
    productItem: {
        marginBottom: 12,
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    emptySubtitle: {
        fontSize: 13,
        color: Colors.textMuted,
    },
});
