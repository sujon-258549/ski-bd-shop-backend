import sendSuccess, { sendSuccessNoData } from '../utility/send-seccess';
import { productServices } from './product.Servises';
import httpStatus from 'http-status';
import catchAsync from '../utility/catchAsync';

// ✅ Create Product
const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductDB(req.body);
  sendSuccess(res, {
    success: true,
    message: 'Product created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

// ✅ Update Product
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.updateProductDB(id, req.body);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

// ✅ Delete Product
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await productServices.deleteProductDB(id);
  sendSuccessNoData(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
  });
});

// ✅ Get All Products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductsDB(req.query);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

// ✅ Get Single Product by ID
const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getProductByIdDB(id);
  sendSuccess(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
