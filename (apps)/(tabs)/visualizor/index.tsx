import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Animated,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle, Paintbrush, RotateCcw } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { paintColors, colorFamilies } from '@/mocks/paintColors';
import { openWhatsApp } from '@/utils/whatsapp';
import { PaintColor } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ROOM_WIDTH = SCREEN_WIDTH - 40;
const ROOM_HEIGHT = 280;

export default function VisualizerScreen() {
    const insets = useSafeAreaInsets();
    const [selectedColor, setSelectedColor] = useState<PaintColor>(paintColors[0]);
    const [selectedFamily, setSelectedFamily] = useState('All');
    const [accentColor, setAccentColor] = useState<PaintColor | null>(null);
    const [mode, setMode] = useState<'main' | 'accent'>('main');
    const colorAnim = useRef(new Animated.Value(1)).current;

    const filteredColors = useMemo(() => {
        if (selectedFamily === 'All') return paintColors;
        return paintColors.filter((c) => c.family === selectedFamily);
    }, [selectedFamily]);

    const handleColorSelect = (color: PaintColor) => {
        Animated.sequence([
            Animated.timing(colorAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
            Animated.timing(colorAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]).start();

        if (mode === 'main') {
            setSelectedColor(color);
        } else {
            setAccentColor(color);
        }
    };

    const isLightColor = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 128;
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Color Visualizer</Text>
                    <Text style={styles.subtitle}>Preview colors on your walls</Text>
                </View>
                <TouchableOpacity
                    style={styles.headerWhatsApp}
                    onPress={() =>
                        openWhatsApp(
                            `Hi! I'm interested in the color "${selectedColor.name}" (${selectedColor.hex}). Is it available?`
                        )
                    }
                    activeOpacity={0.7}
                >
                    <MessageCircle size={18} color="#fff" fill="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Animated.View style={[styles.roomPreview, { opacity: colorAnim }]}>
                    <View style={[styles.ceiling]} />
                    <View style={styles.wallContainer}>
                        <View style={[styles.wall, { backgroundColor: selectedColor.hex }]}>
                            <View style={styles.wallFrame}>
                                <View style={[styles.frameInner, { backgroundColor: accentColor?.hex ?? '#2a2520' }]} />
                            </View>

                            <View style={styles.wallShelf}>
                                <View style={styles.shelfLine} />
                                <View style={styles.shelfItem1} />
                                <View style={styles.shelfItem2} />
                            </View>

                            {accentColor && (
                                <View style={[styles.accentStripe, { backgroundColor: accentColor.hex }]} />
                            )}
                        </View>
                    </View>
                    <View style={styles.floor}>
                        <View style={styles.floorLine} />
                        <View style={[styles.floorLine, { left: '30%' }]} />
                        <View style={[styles.floorLine, { left: '60%' }]} />
                    </View>

                    <View style={styles.furnitureCouch}>
                        <View style={styles.couchBack} />
                        <View style={styles.couchSeat} />
                        <View style={styles.couchArm} />
                        <View style={[styles.couchArm, styles.couchArmRight]} />
                    </View>

                    <View style={styles.roomLabel}>
                        <Text style={[styles.roomLabelText, isLightColor(selectedColor.hex) && { color: '#333' }]}>
                            {selectedColor.name}
                        </Text>
                        <Text style={[styles.roomLabelHex, isLightColor(selectedColor.hex) && { color: '#666' }]}>
                            {selectedColor.hex}
                        </Text>
                    </View>
                </Animated.View>

                <View style={styles.modeSelector}>
                    <TouchableOpacity
                        style={[styles.modeBtn, mode === 'main' && styles.modeBtnActive]}
                        onPress={() => setMode('main')}
                    >
                        <Paintbrush size={14} color={mode === 'main' ? Colors.background : Colors.textSecondary} />
                        <Text style={[styles.modeBtnText, mode === 'main' && styles.modeBtnTextActive]}>
                            Main Wall
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modeBtn, mode === 'accent' && styles.modeBtnActive]}
                        onPress={() => setMode('accent')}
                    >
                        <Paintbrush size={14} color={mode === 'accent' ? Colors.background : Colors.textSecondary} />
                        <Text style={[styles.modeBtnText, mode === 'accent' && styles.modeBtnTextActive]}>
                            Accent
                        </Text>
                    </TouchableOpacity>
                    {accentColor && (
                        <TouchableOpacity
                            style={styles.resetAccentBtn}
                            onPress={() => setAccentColor(null)}
                        >
                            <RotateCcw size={14} color={Colors.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.colorInfo}>
                    <View style={[styles.colorPreviewDot, { backgroundColor: selectedColor.hex }]} />
                    <View style={styles.colorInfoText}>
                        <Text style={styles.colorInfoName}>{selectedColor.name}</Text>
                        <Text style={styles.colorInfoHex}>{selectedColor.hex} · {selectedColor.family}</Text>
                    </View>
                    {accentColor && (
                        <>
                            <Text style={styles.plusSign}>+</Text>
                            <View style={[styles.colorPreviewDot, { backgroundColor: accentColor.hex }]} />
                            <View style={styles.colorInfoText}>
                                <Text style={styles.colorInfoName}>{accentColor.name}</Text>
                                <Text style={styles.colorInfoHex}>{accentColor.hex}</Text>
                            </View>
                        </>
                    )}
                </View>

                <FlatList
                    data={colorFamilies}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.familyFilter}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.familyChip, selectedFamily === item && styles.familyChipActive]}
                            onPress={() => setSelectedFamily(item)}
                        >
                            <Text
                                style={[styles.familyChipText, selectedFamily === item && styles.familyChipTextActive]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                <View style={styles.colorGrid}>
                    {filteredColors.map((color) => (
                        <TouchableOpacity
                            key={color.id}
                            style={[
                                styles.colorSwatch,
                                { backgroundColor: color.hex },
                                (selectedColor.id === color.id || accentColor?.id === color.id) &&
                                styles.colorSwatchActive,
                            ]}
                            onPress={() => handleColorSelect(color)}
                            activeOpacity={0.7}
                        >
                            {(selectedColor.id === color.id || accentColor?.id === color.id) && (
                                <View
                                    style={[
                                        styles.swatchCheck,
                                        { backgroundColor: isLightColor(color.hex) ? '#333' : '#fff' },
                                    ]}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.whatsAppOrder}
                    onPress={() =>
                        openWhatsApp(
                            `Hi! I'd like to order paint in "${selectedColor.name}" (${selectedColor.hex})${accentColor ? ` with accent "${accentColor.name}" (${accentColor.hex})` : ''
                            }. Please help me with options.`
                        )
                    }
                    activeOpacity={0.8}
                >
                    <MessageCircle size={18} color="#fff" fill="#fff" />
                    <Text style={styles.whatsAppOrderText}>Order This Color via WhatsApp</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
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
        paddingTop: 8,
        paddingBottom: 16,
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
    scrollContent: {
        paddingHorizontal: 20,
    },
    roomPreview: {
        width: ROOM_WIDTH,
        height: ROOM_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        position: 'relative',
    },
    ceiling: {
        height: 20,
        backgroundColor: '#E8E4DE',
    },
    wallContainer: {
        flex: 1,
    },
    wall: {
        flex: 1,
        position: 'relative',
    },
    wallFrame: {
        position: 'absolute',
        top: 20,
        left: '15%',
        width: '30%',
        height: '45%',
        borderWidth: 3,
        borderColor: '#8B7355',
        backgroundColor: '#D4C5A9',
        borderRadius: 2,
        padding: 4,
    },
    frameInner: {
        flex: 1,
        borderRadius: 1,
    },
    wallShelf: {
        position: 'absolute',
        top: 30,
        right: '10%',
        width: '25%',
        height: 4,
        backgroundColor: '#8B7355',
        borderRadius: 2,
    },
    shelfLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    shelfItem1: {
        position: 'absolute',
        bottom: 4,
        left: '10%',
        width: 14,
        height: 20,
        backgroundColor: '#6B8E23',
        borderRadius: 2,
    },
    shelfItem2: {
        position: 'absolute',
        bottom: 4,
        right: '15%',
        width: 10,
        height: 16,
        backgroundColor: '#C8A2C8',
        borderRadius: 8,
    },
    accentStripe: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '25%',
        opacity: 0.85,
    },
    floor: {
        height: 40,
        backgroundColor: '#8B6F47',
        position: 'relative',
        overflow: 'hidden',
    },
    floorLine: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    furnitureCouch: {
        position: 'absolute',
        bottom: 40,
        left: '25%',
        width: '50%',
        height: 50,
    },
    couchBack: {
        position: 'absolute',
        top: 0,
        left: 5,
        right: 5,
        height: 25,
        backgroundColor: '#4A3728',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    couchSeat: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30,
        backgroundColor: '#5C4033',
        borderRadius: 4,
    },
    couchArm: {
        position: 'absolute',
        bottom: 0,
        left: -6,
        width: 12,
        height: 38,
        backgroundColor: '#4A3728',
        borderRadius: 4,
    },
    couchArmRight: {
        left: undefined,
        right: -6,
    },
    roomLabel: {
        position: 'absolute',
        top: 28,
        right: 12,
        alignItems: 'flex-end',
    },
    roomLabelText: {
        fontSize: 12,
        fontWeight: '700' as const,
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    roomLabelHex: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.7)',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    modeSelector: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 14,
        alignItems: 'center',
    },
    modeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    modeBtnActive: {
        backgroundColor: Colors.gold,
        borderColor: Colors.gold,
    },
    modeBtnText: {
        fontSize: 13,
        color: Colors.textSecondary,
        fontWeight: '600' as const,
    },
    modeBtnTextActive: {
        color: Colors.background,
    },
    resetAccentBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    colorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        backgroundColor: Colors.card,
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    colorPreviewDot: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    colorInfoText: {
        flex: 1,
    },
    colorInfoName: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: Colors.textPrimary,
    },
    colorInfoHex: {
        fontSize: 11,
        color: Colors.textMuted,
    },
    plusSign: {
        fontSize: 16,
        color: Colors.textMuted,
        fontWeight: '600' as const,
    },
    familyFilter: {
        marginBottom: 16,
    },
    familyChip: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 18,
        backgroundColor: Colors.surface,
        marginRight: 8,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    familyChipActive: {
        backgroundColor: Colors.gold,
        borderColor: Colors.gold,
    },
    familyChipText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '600' as const,
    },
    familyChipTextActive: {
        color: Colors.background,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    colorSwatch: {
        width: (ROOM_WIDTH - 50) / 6,
        height: (ROOM_WIDTH - 50) / 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSwatchActive: {
        borderWidth: 3,
        borderColor: Colors.gold,
    },
    swatchCheck: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    whatsAppOrder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: Colors.whatsapp,
        paddingVertical: 16,
        borderRadius: 14,
    },
    whatsAppOrderText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '700' as const,
    },
});
