import { Request, Response, Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/",getAllUsers);

router.get("/:id",authMiddleware ,getUserById);

router.patch("/:id",updateUser);

router.delete("/:id", deleteUser);    

export { router };
