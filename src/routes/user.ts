import { Request, Response, Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user";

const router = Router();

router.get("/",getAllUsers);

router.get("/:id",getUserById);

router.patch("/:id",updateUser);

router.delete("/:id", deleteUser);    

export { router };
