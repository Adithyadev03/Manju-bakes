export interface CakePrice {
  halfKg?: number;
  oneKg?: number;
  fixed?: number; // For non-weight items like mini cakes
  isEstimatedRange?: boolean; // For ranges like 25-30
  rangeStart?: number;
  rangeEnd?: number;
}

export type CakeCategory = 'all' | 'chocolate' | 'special' | 'fruit' | 'nocream' | 'mini';

export interface CakeItem {
  id: string;
  name: string;
  category: CakeCategory;
  price: CakePrice;
  description: string;
  image: string; // We'll use nice cake designs or CSS patterns or high-quality illustration placeholders
  tags: string[];
  isEgglessAvailable: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string; // unique cart instance id (combination of item id + customization)
  item: CakeItem;
  quantity: number;
  selectedWeight: 'halfKg' | 'oneKg' | 'custom' | 'fixed';
  customWeightVal?: number; // e.g., 1.5 or 2
  isEggless: boolean;
  creamLevel: 'less' | 'normal' | 'extra';
  noAddedColors: boolean;
  messageOnCake: string;
  specialInstructions: string;
  price: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  text: string;
  reviewCount?: number;
  photosCount?: number;
  responseByOwner?: string;
  tags?: string[];
}
