import AppError from '../../Error/Apperror';
import QueryBalder from '../../QueryBalder/querybalder';
import { User } from '../User/User.mole';
import { TOrder } from './order.interfaces';
import { Order } from './order.Model';

const searchOrderFields = ['address.address', 'address.district'];

// ✅ Create Order
const createOrderDB = async (payload: TOrder) => {
  // payload.product = existUser._id
  const result = await Order.create(payload);
  return result;
};

const updateOrderStatusDB = async (id: string, updateData: any) => {
  // Find the order by ID and update with the new data
  const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
    new: true, // return the updated document
    runValidators: true, // ensure schema validation
  });

  if (!updatedOrder) {
    throw new Error('Order not found or cannot be updated.');
  }

  return updatedOrder;
};

// ✅ Update Order
const updateOrderDB = async (id: string, payload: Partial<TOrder>) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new Error('Order not found or update failed.');
  }
  return result;
};

// ✅ Delete Order
const deleteOrderDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Order not found or already deleted.');
  }
  return result;
};

// ✅ Get All Orders (filters, search, pagination)
const getAllOrdersDB = async (query: Record<string, unknown>) => {
  console.log('Query Params:', query);
  const orderQuery = new QueryBalder(
    Order.find().populate('product.id'), // 👈 populate nested path
    query,
  )
    .search(searchOrderFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const meta = await orderQuery.countTotal();
  const data = await orderQuery.modelQuery.exec(); // ensure query executes
  return { meta, data };
};

const getMyOrdersDB = async (query: Record<string, unknown>, user: any) => {
  const existUser = await User.findOne({ email: user.email });

  console.log('User =>', existUser);

  if (!existUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authorized');
  }

  // orderId দিয়ে order খোঁজা
  const orderQuery = new QueryBalder(
    Order.find({ orderId: existUser._id }).populate('product.id'),
    query,
  )
    .search(searchOrderFields)
    .filter()
    .sort()
    .pagination()
    .fields();
  const meta = await orderQuery.countTotal();
  const data = await orderQuery.modelQuery;

  return { meta, data };
};

// ✅ Get Single Order by ID
const getOrderByIdDB = async (id: string) => {
  const result = await Order.findById(id).populate('product.id');
  if (!result) {
    throw new Error('Order not found.');
  }
  return result;
};

export const orderServices = {
  createOrderDB,
  updateOrderDB,
  getMyOrdersDB,
  deleteOrderDB,
  getAllOrdersDB,
  getOrderByIdDB,
  updateOrderStatusDB,
};
