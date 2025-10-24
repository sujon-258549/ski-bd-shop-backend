import sendSuccess, { sendSuccessNoData } from "../utility/send-seccess";
import httpStatus from "http-status";
import catchAsync from "../utility/catchAsync";
import { orderServices } from "./order.Servises";

// ✅ Create Order
const createOrder = catchAsync(async (req, res) => {
  const result = await orderServices.createOrderDB(req.body, req.user);
  sendSuccess(res, {
    success: true,
    message: "Order created successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

// ✅ Update Order
const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.updateOrderDB(id, req.body);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

// ✅ Delete Order
const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  await orderServices.deleteOrderDB(id);
  sendSuccessNoData(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successfully",
  });
});

// ✅ Get All Orders
const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrdersDB(req.query);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});
const getMyOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getMyOrdersDB(req.query, req?.user);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

// ✅ Get Single Order by ID
const getOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.getOrderByIdDB(id);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getMyOrders
};
