import { Router } from "express";

import auth from "../utility/Auth";
import { userRole } from "../User/User.const";
import zodValidation from "../utility/zodValidation";
import { orderValidation } from "./order.Validation";
import { orderController } from "./order.controllers";


const router = Router();

// ✅ Create Order (admin or user can create)
router.post(
  "/",
  auth(userRole.admin, userRole.user),
  // zodValidation(orderValidation.createOrderValidationSchema),
  orderController.createOrder
);

// ✅ Update Order (only admin)
router.patch(
  "/:id",
  auth(userRole.admin),
  zodValidation(orderValidation.updateOrderValidationSchema),
  orderController.updateOrder
);

// ✅ Delete Order (only admin)
router.delete("/:id", auth(userRole.admin, userRole.user), orderController.deleteOrder);

// ✅ Get all orders (admin can see all, user can see their own)
router.get("/", auth(userRole.admin, userRole.user), orderController.getAllOrders);
router.get("/my-order", auth(userRole.admin, userRole.user), orderController.getMyOrders);

// ✅ Get single order by ID (admin can see any, user can see their own)
router.get("/:id", auth(userRole.admin, userRole.user), orderController.getOrderById);

export const orderRouter = router;
