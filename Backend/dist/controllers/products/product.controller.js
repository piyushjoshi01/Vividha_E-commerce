"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_services_1 = __importDefault(require("../../services/products/product.services"));
class ProductController {
    constructor() { }
    addProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = req.body;
            console.log("Received products:", products);
            if (!Array.isArray(products) || products.length === 0) {
                res
                    .status(400)
                    .json({ message: "Invalid input, expected an array of products" });
                return;
            }
            try {
                console.log("Calling addNewProduct service method");
                const result = yield product_services_1.default.addNewProduct(products);
                res.status(201).json({ message: "Products added successfully", result });
            }
            catch (err) {
                console.log(err);
                throw new Error("Internal Server Error");
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_services_1.default.getAllProducts();
                console.log(result);
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield product_services_1.default.getProductByID(id);
                console.log(result);
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                throw new Error("Internal Server error");
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = req.body;
            try {
                const result = yield product_services_1.default.updateProduct(id, product);
                if (result == "Product Updated Successfully") {
                    res.status(200).json({ message: "Product Updated" });
                    console.log(product);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const result = yield product_services_1.default.deleteProduct(id);
            if (result == "Product Deleted Successfully") {
                res.status(200).json({ message: " Product Deleted" });
            }
            else {
                res.status(500).json({ message: "Failed to Delete the Product" });
            }
        });
    }
    purchaseProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchaseproducts = req.body;
            console.log("Received products:", purchaseproducts);
            // if (!Array.isArray(purchaseproducts) || purchaseproducts.length === 0) {
            //   res
            //     .status(400)
            //     .json({ message: "Invalid input, expected an array of products" });
            //   return;
            // }
            try {
                console.log("Calling addNewProduct service method");
                const result = yield product_services_1.default.purchaseProduct(purchaseproducts);
                res.status(201).json({ message: "Your order is confirmed!!", result });
            }
            catch (err) {
                console.log(err);
                throw new Error("Internal Server Error");
            }
        });
    }
}
exports.default = new ProductController();
