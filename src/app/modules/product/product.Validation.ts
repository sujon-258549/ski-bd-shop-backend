import { z } from "zod";

// ✅ Create Product Validation
export const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(200, "Name cannot exceed 200 characters"),

    photo: z.string().url("Invalid photo URL"),

    description: z
      .string()
      .min(1, "Description is required"),

    price: z
      .number()
      .min(0, "Price must be a positive number"),

    stock: z
      .number()
      .min(0, "Stock must be zero or a positive number"),

    category: z
      .string()
      .min(1, "Category ID is required"),

    brand: z
      .string()
      .optional(),

   
  }),
});

// ✅ Update Product Validation
export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().max(200, "Name cannot exceed 200 characters").optional(),
    photo: z.string().url("Invalid photo URL").optional(),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    stock: z.number().min(0, "Stock must be zero or a positive number").optional(),
    status: z.enum(["active", "inactive"]).optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
  }),
});

// ✅ Export all product validations
export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
