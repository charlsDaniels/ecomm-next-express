import { Category } from './Category';

export interface Stock {
  size: string;
  quantity: number;
}

export interface DBProduct {
  _id: string;
  name: string;
  description: string;
  isAvailable: boolean;
  category: Category;
  price: number;
  isFeatured: boolean
  pictureUrl: string;
  stock: Stock[];
}

export interface DBProductResponse {
  total: number,
  products: DBProduct[]
}