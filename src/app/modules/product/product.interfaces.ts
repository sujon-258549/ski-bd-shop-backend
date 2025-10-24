import { Types } from "mongoose";

export interface TProduct {
  name: string;                     // Product name
  photo: string;                    // Product image URL
  description: string;              // Product description
  price: number;                    // Unit price
  stock: number;                    // Available stock
  category: Types.ObjectId;         // Linked category
  brand?: string;                   // Brand name (optional)
}