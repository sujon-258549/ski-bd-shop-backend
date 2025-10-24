import { Router } from "express";
import { categoryValidation } from "./category.Validation";
import { categoryController } from "./category.controllers";
import auth from "../utility/Auth";
import { userRole } from "../User/User.const";
import zodValidation from "../utility/zodValidation";

const router = Router();

// ✅ Create Category (admin only)
router.post(
  "/",
  auth(userRole.admin),
  zodValidation(categoryValidation.createCategoryValidationSchema),
  categoryController.createCategory
);

// ✅ Update Category (admin only)
router.patch(
  "/:id",
  auth(userRole.admin),
  zodValidation(categoryValidation.updateCategoryValidationSchema),
  categoryController.updateCategory
);

// ✅ Delete Category (admin only)
router.delete("/:id", auth(userRole.admin), categoryController.deleteCategory);

// ✅ Get all categories (public)
router.get("/", categoryController.getAllCategories);

// ✅ Get single category by ID (public)
router.get("/:id",  categoryController.getCategoryById);

export const categoryRouter = router;
