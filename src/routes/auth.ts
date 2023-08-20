import { Request, Response, Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile",authMiddleware, getProfile);

export { router };
