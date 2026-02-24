import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calculator, RotateCcw, MessageCircle, Minus, Plus, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { openWhatsApp } from '@/utils/whatsapp';

const DOOR_AREA = 1.9;
const WINDOW_AREA = 1.1;
const DEFAULT_COVERAGE = 120;

export default function CalculatorScreen() {
    const insets = useSafeAreaInsets();
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [doors, setDoors] = useState(1);
    const [windows, setWindows] = useState(1);
    const [coats, setCoats] = useState(2);
    const [coverage, setCoverage] = useState('120');

    const calculation = useMemo(() => {
        const l = parseFloat(length) || 0;
        const w = parseFloat(width) || 0;
        const h = parseFloat(height) || 0;
        const cov = parseFloat(coverage) || DEFAULT_COVERAGE;

        if (l <= 0 || w <= 0 || h <= 0) return null;

        const wallArea = 2 * (l + w) * h;
        const doorArea = doors * DOOR_AREA;
        const windowArea = windows * WINDOW_AREA;
        const paintableArea = wallArea - doorArea - windowArea;
        const totalArea = paintableArea * coats;
        const litersNeeded = totalArea / cov;
        const cansNeeded = Math.ceil(litersNeeded);

        return {
            wallArea: wallArea.toFixed(1),
            paintableArea: paintableArea.toFixed(1),
            totalArea: totalArea.toFixed(1),
            litersNeeded: litersNeeded.toFixed(1),
            cansNeeded,
        };
    }, [length, width, height, doors, windows, coats, coverage]);

    const handleReset = () => {
        setLength('');
        setWidth('');
        setHeight('');
        setDoors(1);
        setWindows(1);
        setCoats(2);
        setCoverage('120');
    };

    const renderCounter = (
        label: string,
        value: number,
        onDecrement: () => void,
        onIncrement: () => void,
        min: number
    ) => (
        <View style={styles.counterRow}>
            <Text style={styles.counterLabel}>{label}</Text>
            <View style={styles.counterControls}>
                <TouchableOpacity
                    style={[styles.counterBtn, value <= min && styles.counterBtnDisabled]}
                    onPress={onDecrement}
                    disabled={value <= min}
                >
                    <Minus size={14} color={value <= min ? Colors.textMuted : Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{value}</Text>
                <TouchableOpacity style={styles.counterBtn} onPress={onIncrement}>
                    <Plus size={14} color={Colors.textPrimary} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Paint Calculator</Text>
                    <Text style={styles.subtitle}>Estimate paint needed for your room</Text>
                </View>
                <TouchableOpacity
                    style={styles.headerWhatsApp}
                    onPress={() => openWhatsApp('Hi! I need help calculating paint for my room.')}
                    activeOpacity={0.7}
                >
                    <MessageCircle size={18} color="#fff" fill="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Calculator size={18} color={Colors.gold} />
                        <Text style={styles.cardTitle}>Room Dimensions</Text>
                    </View>

                    <View style={styles.inputGrid}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Length (ft)</Text>
                            <TextInput
                                style={styles.input}
                                value={length}
                                onChangeText={setLength}
                                keyboardType="decimal-pad"
                                placeholder="0"
                                placeholderTextColor={Colors.textMuted}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Width (ft)</Text>
                            <TextInput
                                style={styles.input}
                                value={width}
                                onChangeText={setWidth}
                                keyboardType="decimal-pad"
                                placeholder="0"
                                placeholderTextColor={Colors.textMuted}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Height (ft)</Text>
                            <TextInput
                                style={styles.input}
                                value={height}
                                onChangeText={setHeight}
                                keyboardType="decimal-pad"
                                placeholder="0"
                                placeholderTextColor={Colors.textMuted}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Coverage (sq.ft/L)</Text>
                            <TextInput
                                style={styles.input}
                                value={coverage}
                                onChangeText={setCoverage}
                                keyboardType="decimal-pad"
                                placeholder="120"
                                placeholderTextColor={Colors.textMuted}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Adjustments</Text>
                    {renderCounter(
                        'Doors',
                        doors,
                        () => setDoors(Math.max(0, doors - 1)),
                        () => setDoors(doors + 1),
                        0
                    )}
                    {renderCounter(
                        'Windows',
                        windows,
                        () => setWindows(Math.max(0, windows - 1)),
                        () => setWindows(windows + 1),
                        0
                    )}
                    {renderCounter(
                        'Coats',
                        coats,
                        () => setCoats(Math.max(1, coats - 1)),
                        () => setCoats(coats + 1),
                        1
                    )}
                </View>

                {calculation && (
                    <View style={styles.resultCard}>
                        <LinearGradient
                            colors={['#1a1810', '#151510']}
                            style={styles.resultGradient}
                        >
                            <Text style={styles.resultTitle}>Estimation Results</Text>

                            <View style={styles.resultGrid}>
                                <View style={styles.resultItem}>
                                    <Text style={styles.resultValue}>{calculation.wallArea}</Text>
                                    <Text style={styles.resultLabel}>Wall Area (sq.ft)</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <Text style={styles.resultValue}>{calculation.paintableArea}</Text>
                                    <Text style={styles.resultLabel}>Paintable Area</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <Text style={styles.resultValue}>{calculation.totalArea}</Text>
                                    <Text style={styles.resultLabel}>Total w/ Coats</Text>
                                </View>
                                <View style={styles.resultItem}>
                                    <Text style={[styles.resultValue, styles.resultHighlight]}>
                                        {calculation.litersNeeded}L
                                    </Text>
                                    <Text style={styles.resultLabel}>Paint Needed</Text>
                                </View>
                            </View>

                            <View style={styles.resultSummary}>
                                <Text style={styles.summaryText}>
                                    You need approximately{' '}
                                    <Text style={styles.summaryHighlight}>{calculation.cansNeeded} liters</Text>{' '}
                                    of paint for your room
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Info size={12} color={Colors.textMuted} />
                                <Text style={styles.infoText}>
                                    Based on {coats} coat(s) with {coverage} sq.ft/L coverage
                                </Text>
                            </View>
                        </LinearGradient>
                    </View>
                )}

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                        <RotateCcw size={16} color={Colors.textSecondary} />
                        <Text style={styles.resetText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.orderBtn}
                        onPress={() =>
                            openWhatsApp(
                                calculation
                                    ? `Hi! I calculated I need about ${calculation.litersNeeded}L of paint for my room (${length}x${width}x${height} ft). Can you help me choose the right paint?`
                                    : undefined
                            )
                        }
                    >
                        <MessageCircle size={16} color="#fff" fill="#fff" />
                        <Text style={styles.orderText}>Order via WhatsApp</Text>
                    </TouchableOpacity>
                </View>

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
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
    },
    inputGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    inputGroup: {
        width: '47%',
    },
    inputLabel: {
        fontSize: 11,
        color: Colors.textSecondary,
        fontWeight: '600' as const,
        marginBottom: 6,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight: '600' as const,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    counterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    counterLabel: {
        fontSize: 14,
        color: Colors.textPrimary,
        fontWeight: '500' as const,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    counterBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    counterBtnDisabled: {
        opacity: 0.4,
    },
    counterValue: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: Colors.textPrimary,
        minWidth: 24,
        textAlign: 'center' as const,
    },
    resultCard: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.goldDark,
    },
    resultGradient: {
        padding: 20,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: Colors.gold,
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    resultGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    resultItem: {
        width: '47%',
        backgroundColor: 'rgba(201,169,110,0.08)',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
    },
    resultValue: {
        fontSize: 22,
        fontWeight: '800' as const,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    resultHighlight: {
        color: Colors.gold,
    },
    resultLabel: {
        fontSize: 10,
        color: Colors.textMuted,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.5,
    },
    resultSummary: {
        backgroundColor: 'rgba(201,169,110,0.12)',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 20,
        textAlign: 'center' as const,
    },
    summaryHighlight: {
        color: Colors.gold,
        fontWeight: '700' as const,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 11,
        color: Colors.textMuted,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    resetBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    resetText: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '600' as const,
    },
    orderBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: Colors.whatsapp,
    },
    orderText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700' as const,
    },
});
