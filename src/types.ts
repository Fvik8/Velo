import { LucideIcon } from 'lucide-react';

export interface Product {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  size?: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Recipe {
  id: number;
  title: string;
  time: string;
  difficulty: string;
  image: string;
  ingredients: string[];
  method: string[];
}
