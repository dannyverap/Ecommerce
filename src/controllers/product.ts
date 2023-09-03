import { Request, Response, request } from "express";
import {
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  registerNewProductService,
  updateProductService,
} from "../service/product";
import { handleHttP } from "../utils/error.handler";
import { RequestExt } from "../interfaces/request.interface";
import { validateMongoId } from "../utils/validateMongoId";
import { Product } from "../interfaces/product.interface";

var slugify = require("slugify");

const registerProduct = async ({ body }: Request, res: Response) => {
  try {
    if (body.title) body.slug = slugify = body.title;

    const newProduct = await registerNewProductService(body);
    res.send(newProduct);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const getAllProducts = async (req: RequestExt, res: Response) => {
  try {
    
    const queryData = req.query 
    console.log(queryData);
    
    const allProducts = await getAllProductsService(queryData);
    res.send(allProducts);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const getProductById = async ({ params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    validateMongoId(id);
    const product = await getProductByIdService(id);
    res.send(product);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const updateProduct = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    if (body.slug)  throw new Error("You can't modify the slug directly")
    if (body.title) body.slug = slugify = body.title;
    
    const updatedProduct = await updateProductService(id, body);
    res.send(updatedProduct);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const deleteProduct = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const deletedProduct = await deleteProductService(id);
    res.send(deletedProduct);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

export {
  registerProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
