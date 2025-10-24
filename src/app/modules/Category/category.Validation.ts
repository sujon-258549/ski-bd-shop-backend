import { z } from "zod";

// ✅ Create Category
export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Category name is required")
      .max(100, "Category name cannot exceed 100 characters"),
    description: z
      .string()
  }),
});

// ✅ Update Category
export const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Category name is required")
      .max(100, "Category name cannot exceed 100 characters")
      .optional(),
  }),
});

export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
