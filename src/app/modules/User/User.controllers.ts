import catchAsync from '../utility/catchAsync';
import sendSuccess, { sendSuccessNoData } from '../utility/send-seccess';
import httpStatus from 'http-status';
import { userServices } from './User.services';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);
  sendSuccess(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const blockUserAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userServices.blockUserAdminIntoDB(userId);
  console.log(result);
  sendSuccessNoData(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});
const blogDeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.blogDeleteAdminIntoDB(id);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data:result
  });
});
const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  console.log(req.user)
  const result = await userServices.getMe(email);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Date Retrieved successfully',
    data:result
  });
});
const allUser = catchAsync(async (req, res) => {
  const result = await userServices.allUser();
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User Retrieved successfully',
    data:result
  });
});
const adminDashboard = catchAsync(async (req, res) => {
  const result = await userServices.adminDashBoard();
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Dashboard Data Retrieved successfully',
    data:result
  });
});

export const userController = {
  createUser,
  blockUserAdmin,
  blogDeleteAdmin,
  getMe,
  adminDashboard,
  allUser
};
