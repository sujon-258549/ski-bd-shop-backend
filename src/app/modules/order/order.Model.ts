import { Schema, model } from "mongoose";
import { TOrder } from "./order.interfaces";
const AddressSchema = new Schema({
  address: { type: String, required: true },
  district: { type: String, required: true },
});


const ProductItemSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  orderQuantity: { type: Number, required: true }
});
// Order Schema
const OrderSchema = new Schema<TOrder>(
  {
    product: [ProductItemSchema],
    address: AddressSchema,
    totalAmount: { type: Number, required: true },
    deliveryStatus: { type: Boolean, default: false },
    paymentStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Model
export const Order = model<TOrder>("Order", OrderSchema);
