import { Types } from "mongoose";


interface Address {
  address: string;
  district: string;
}

interface ProductItem {
  id: Types.ObjectId;        // এখানে ObjectId
  orderQuantity: number;
}

export interface TOrder {
  orderId: Types.ObjectId;
  product: ProductItem[];
  address: Address;
  totalAmount: number;
  deliveryStatus: boolean;
  paymentStatus: boolean;
}