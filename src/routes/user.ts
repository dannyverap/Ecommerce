import { Request, Response, Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";

const router = Router();

router.get("/", authMiddleware, roleMiddleware, getAllUsers);

router.get("/:id", authMiddleware, getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export { router };
