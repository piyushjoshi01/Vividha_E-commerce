import express from "express";

import productController from "../../controllers/products/product.controller";

const router = express.Router();

router.use(express.json());

router.post("/add-new-product", productController.addProducts);
router.get("/get-all-products", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);
router.put("/updateProduct/:id", productController.updateProduct);
router.post("/deleteProduct", productController.deleteProduct);
router.post("/purchaseProduct", productController.purchaseProducts);

export default router;
