import { Category } from '../Category/category.Model';
import { Order } from '../order/order.Model';
import { Product } from '../product/product.Model';
import { TUser } from './User.interface';
import { User } from './User.mole';
import bcrypt from 'bcrypt';
const createUser = async (payload: TUser) => {
  console.log(payload);
  const result = await User.create(payload);
  return result;
};

// admin block user
const blockUserAdminIntoDB = async (id: string) => {
  // Update the user's isBlocked field to true
  const result = await User.findByIdAndUpdate(
    id, // Filter: document ID
    { isBlocked: true }, // Update: set isBlocked to true
    { new: true }, // Option: return the updated document
  );

  // Check if the user was found and updated
  if (!result) {
    throw new Error('User not found or unable to update.');
  }

  return result;
};

const getMe = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

const updateUser = async (email: string, updateData: any) => {
  const result = await User.findOneAndUpdate({ email: email }, updateData, {
    new: true, // return updated document
    runValidators: true, // validate schema
  });

  if (!result) {
    throw new Error('User not found');
  }

  return result;
};

// ✅ Update user info or password
const changePasswordService = async (
  email: string,
  oldPassword: string,
  newPassword: string,
) => {
  // Step 1: Find user by email
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error('User not found');
  }

  // Step 2: Check old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error('Old password is incorrect');
  }

  // Step 3: Hash and set new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  // Step 4: Save updated user
  await user.save();

  // Step 5: Return success message
  return {
    message: 'Password updated successfully',
  };
};

const allUser = async () => {
  const result = await User.find({ role: 'user' });
  return result;
};

// admin delete blog
const blogDeleteAdminIntoDB = async (id: string) => {
  // Update the user's isBlocked field to true
  const result = await Product.findByIdAndDelete(id);
  return result;
};

const adminDashBoard = async () => {
  const product = await Product.find();
  const category = await Category.find();
  const user = await User.find({ role: 'user' });

  const productLength = product.length;
  const categoryLength = category.length;
  const userLength = user.length;

  const orders = await Order.find();

  const totalQuantity = orders.reduce((sum, order) => {
    const productSum = order.product.reduce(
      (acc, item) => acc + Number(item.orderQuantity),
      0,
    );
    return sum + productSum;
  }, 0);

  return { productLength, categoryLength, userLength, totalQuantity };
};

export const userServices = {
  createUser,
  blockUserAdminIntoDB,
  blogDeleteAdminIntoDB,
  getMe,
  adminDashBoard,
  allUser,
  changePasswordService,
  updateUser,
};
