import { Request, Response, Router } from "express";
import { registerUser, loginUser, getProfile, blockUser, unblockUser, refreshToken } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile",authMiddleware, getProfile);

router.patch("/block/:id", authMiddleware, roleMiddleware, blockUser )
router.patch("/unblock/:id", authMiddleware, roleMiddleware, unblockUser)

router.put("/refresh-token",refreshToken)

export { router };
