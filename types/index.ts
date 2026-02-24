export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  tagline: string;
}

export interface PaintProduct {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  price: number;
  originalPrice?: number;
  colorHex: string;
  colorName: string;
  finish: string;
  coverage: number;
  size: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
}

export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  family: string;
}

export interface RoomDimension {
  length: number;
  width: number;
  height: number;
  doors: number;
  windows: number;
  coats: number;
}
