import express from "express";

import productController from "../../controllers/products/product.controller";

const router = express.Router();

router.use(express.json());

router.post("/add-new-product", productController.addProducts);
router.get("/get-all-products", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);

export default router;
