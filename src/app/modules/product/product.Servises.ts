import QueryBalder from "../../QueryBalder/querybalder";
import { TProduct } from "./product.interfaces";
import { Product } from "./product.Model";

const searchProductFields = ["name", "description"];

// ✅ Create Product
const createProductDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// ✅ Update Product
const updateProductDB = async (id: string, payload: Partial<TProduct>) => {
  console.log(payload)
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true, // return updated document
    runValidators: true,
  });
  if (!result) {
    throw new Error("Product not found or update failed.");
  }
  return result;
};

// ✅ Delete Product
const deleteProductDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw new Error("Product not found or already deleted.");
  }
  return result;
};

// ✅ Get All Products (with filters, search, pagination, sorting)
const getAllProductsDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBalder(Product.find().populate("category"), query)
    .search(searchProductFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const meta = await productQuery.countTotal()
  const data = await productQuery.modelQuery;
  return { meta, data };
};

// ✅ Get Single Product by ID
const getProductByIdDB = async (id: string) => {
  const result = await Product.findById(id).populate("category");
  if (!result) {
    throw new Error("Product not found.");
  }
  return result;
};

export const productServices = {
  createProductDB,
  updateProductDB,
  deleteProductDB,
  getAllProductsDB,
  getProductByIdDB,
};
