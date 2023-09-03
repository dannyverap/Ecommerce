import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
} from "../controllers/product";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";

const router = Router();

router.post("/",authMiddleware, registerProduct)

router.get("/", authMiddleware, roleMiddleware, getAllProducts);

router.get("/:id", getProductById);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export { router };
