'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, LoyaltyTransaction, LoyaltyUser, Product } from '@/types';
import { loyaltyTiers } from '@/lib/data';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Loyalty
  user: LoyaltyUser | null;
  transactions: LoyaltyTransaction[];
  setUser: (user: LoyaltyUser) => void;
  addPoints: (points: number, description: string) => void;
  redeemPoints: (points: number, description: string) => boolean;
  getUserTier: () => 'bronze' | 'silver' | 'gold' | 'platinum';
  getDiscount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],

      addToCart: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity }] };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Loyalty State
      user: null,
      transactions: [],

      setUser: (user: LoyaltyUser) => set({ user }),

      addPoints: (points: number, description: string) => {
        const state = get();
        if (!state.user) return;

        const tier = state.getUserTier();
        const multiplier = loyaltyTiers[tier].pointMultiplier;
        const earnedPoints = Math.floor(points * multiplier);

        const transaction: LoyaltyTransaction = {
          id: Date.now().toString(),
          type: 'earned',
          points: earnedPoints,
          description,
          date: new Date().toISOString(),
        };

        set((state) => ({
          user: state.user
            ? { ...state.user, points: state.user.points + earnedPoints }
            : null,
          transactions: [transaction, ...state.transactions],
        }));
      },

      redeemPoints: (points: number, description: string) => {
        const state = get();
        if (!state.user || state.user.points < points) return false;

        const transaction: LoyaltyTransaction = {
          id: Date.now().toString(),
          type: 'redeemed',
          points,
          description,
          date: new Date().toISOString(),
        };

        set((state) => ({
          user: state.user
            ? { ...state.user, points: state.user.points - points }
            : null,
          transactions: [transaction, ...state.transactions],
        }));

        return true;
      },

      getUserTier: () => {
        const state = get();
        if (!state.user) return 'bronze';

        const points = state.user.points;
        if (points >= loyaltyTiers.platinum.min) return 'platinum';
        if (points >= loyaltyTiers.gold.min) return 'gold';
        if (points >= loyaltyTiers.silver.min) return 'silver';
        return 'bronze';
      },

      getDiscount: () => {
        const state = get();
        const tier = state.getUserTier();
        return loyaltyTiers[tier].discount;
      },
    }),
    {
      name: 'paint-store-storage',
    }
  )
);
