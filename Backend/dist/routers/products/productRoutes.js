"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../../controllers/products/product.controller"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post("/add-new-product", product_controller_1.default.addProducts);
router.get("/get-all-products", product_controller_1.default.getAllProducts);
router.get("/getProductById/:id", product_controller_1.default.getProductById);
router.put("/updateProduct/:id", product_controller_1.default.updateProduct);
router.post("/deleteProduct", product_controller_1.default.deleteProduct);
router.post("/purchaseProduct", product_controller_1.default.purchaseProducts);
exports.default = router;
