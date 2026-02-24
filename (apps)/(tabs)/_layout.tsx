import { Tabs } from 'expo-router';
import { Home, BookOpen, Calculator, Paintbrush } from 'lucide-react-native';
import React from 'react';
import Colors from '@/constants/colors';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.gold,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopColor: Colors.border,
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    letterSpacing: 0.3,
                },
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="catalog"
                options={{
                    title: 'Catalog',
                    tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="calculator"
                options={{
                    title: 'Calculator',
                    tabBarIcon: ({ color, size }) => <Calculator size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="visualizer"
                options={{
                    title: 'Visualizer',
                    tabBarIcon: ({ color, size }) => <Paintbrush size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
