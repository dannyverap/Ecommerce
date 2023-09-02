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


const registerProduct = async ({ body }: Request, res: Response) => {
  try {
    const newProduct = await registerNewProductService(body);
    res.send(newProduct);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const getAllProducts = async (req: RequestExt, res: Response) => {
  try {
    const allProducts = await getAllProductsService();
    res.send(allProducts );
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const getProductById = async ({ params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    validateMongoId(id)
    const product = await getProductByIdService(id);
    res.send(product);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const updateProduct = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
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


export { registerProduct, getAllProducts, getProductById, updateProduct, deleteProduct};
