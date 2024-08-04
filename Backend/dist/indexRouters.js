"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routers/authentication/authRoutes"));
const userRoutes_1 = __importDefault(require("./routers/users/userRoutes"));
const productRoutes_1 = __importDefault(require("./routers/products/productRoutes"));
const router = express_1.default.Router();
router.use("/auth", authRoutes_1.default);
router.use("/user", userRoutes_1.default);
router.use("/product", productRoutes_1.default);
exports.default = router;
