import { Category } from './Category';

export interface Stock {
  size: string;
  quantity: number;
}

export interface DBProduct {
  _id: string;
  isAvailable: boolean;
  category: Category;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  stock: Stock[];
  isFeatured: boolean
}