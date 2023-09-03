import ProductModel from "../models/product";
import { Product } from "../interfaces/product.interface";

const registerNewProductService = async (Body: Product) => {
  const newProduct = await ProductModel.create(Body);
  return newProduct;
};

const getAllProductsService = async (queryData: Partial<Product>) => {
  const allProducts = await ProductModel.find(queryData);
  return allProducts;
};

const getProductByIdService = async (id: string) => {
  const product = await ProductModel.findOne({ _id: id });
  if (!product) {
    throw new Error("product not found");
  }
  return product;
};

const updateProductService = async (id: string, data: Partial<Product>) => {
  const productToUpdate = await ProductModel.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    }
  );
  if (!productToUpdate) {
    throw new Error("product not found");
  }
  return productToUpdate;
};

const deleteProductService = async (id: string) => {
  const product = await ProductModel.findOneAndDelete({ _id: id });
  if (!product) {
    throw new Error("product not found");
  }
  return `${product?.title} Deleted :C`;
};

export {
  registerNewProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
