import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ title: 'Not Found', headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }} />
            <View style={styles.container}>
                <Text style={styles.emoji}>🎨</Text>
                <Text style={styles.title}>Page not found</Text>
                <Text style={styles.subtitle}>The page you're looking for doesn't exist.</Text>
                <TouchableOpacity style={styles.link} onPress={() => router.replace('/(tabs)/(home)' as never)}>
                    <Text style={styles.linkText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.background,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textMuted,
        marginBottom: 24,
    },
    link: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: Colors.gold,
        borderRadius: 24,
    },
    linkText: {
        fontSize: 14,
        color: Colors.background,
        fontWeight: '700',
    },
});
