import { z } from "zod";

// ✅ Create Order Validation
export const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.array(
      z.object({
        id: z.string().min(1, "Product ID is required"),
        orderQuantity: z.number().min(1, "Order quantity must be at least 1"),
      })
    ).min(1, "At least one product is required"),
    address: z.object({
      address: z.string().min(1, "Address is required"),
    }),
    totalAmount: z.number().min(0, "Total amount must be positive"),
    deliveryStatus: z.boolean().optional(),
    paymentStatus: z.boolean().optional(),
  }),
});

// ✅ Update Order Validation
export const updateOrderValidationSchema = z.object({
  body: z.object({
    product: z.array(
      z.object({
        id: z.string().optional(),
        orderQuantity: z.number().min(1).optional(),
      })
    ).optional(),
    address: z.object({
      address: z.string().optional(),
      district: z.string().optional(),
    }).optional(),
    totalAmount: z.number().min(0).optional(),
    deliveryStatus: z.boolean().optional(),
    paymentStatus: z.boolean().optional(),
  }),
});

export const orderValidation = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
