import express from "express";
import authRoutes from "./routers/authentication/authRoutes";
import userRoutes from "./routers/users/userRoutes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
