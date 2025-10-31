import { Types } from 'mongoose';

interface Address {
  address: string;
  district?: string;
}
interface Customer {
  name: string;
  phone: string;
}

interface ProductItem {
  id: Types.ObjectId; // এখানে ObjectId
  orderQuantity: number;
}

export interface TOrder {
  orderId: Types.ObjectId;
  product: ProductItem[];
  address: Address;
  customer: Customer;
  totalAmount: number;
  deliveryStatus: boolean;
  paymentStatus: boolean;
  isAccepted: boolean;
}
