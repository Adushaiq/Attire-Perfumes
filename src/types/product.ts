export interface ScentNote {
  top: string[];
  heart: string[];
  base: string[];
}

export type Collection = 'daily' | 'premium' | 'luxury';

export interface Product {
  id: string;
  name: string;
  inspiredBy?: string;
  tagline: string;
  description: string;
  price: number;
  collection: Collection;
  category: 'men' | 'women' | 'unisex';
  concentration: 'EDP' | 'EDT' | 'Parfum' | 'Attar';
  sizes: { ml: number; price: number }[];
  notes: ScentNote;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  badges: string[];
  isActive: boolean;
  longevity: string;
  sillage: string;
  season: string[];
}
