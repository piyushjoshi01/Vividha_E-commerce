import express from "express";
import authRoutes from "./routers/authentication/authRoutes";
import userRoutes from "./routers/users/userRoutes";
import productRoutes from "./routers/products/productRoutes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/product", productRoutes)

export default router;
