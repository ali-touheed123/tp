export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'decorative' | 'industrial' | 'auto' | 'projects';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  coverage?: string;
  finishType?: string;
  inStock: boolean;
  loyaltyPoints: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LoyaltyUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalPurchases: number;
  joinDate: string;
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  date: string;
}
