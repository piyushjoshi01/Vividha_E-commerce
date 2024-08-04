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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDb_1 = require("../../config/mongoDb");
const mongodb_1 = require("mongodb");
class ProductServices {
    constructor() { }
    addNewProduct(products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = mongoDb_1.client.db(mongoDb_1.dbName);
                const collection = db.collection("products");
                console.log("Inserting products:", products);
                const result = yield collection.insertMany(products);
                console.log(result);
                if (result.insertedCount === products.length) {
                    return "Products added successfully.";
                }
                else {
                    throw new Error("Error adding products");
                }
            }
            catch (err) {
                console.error("Error adding products:", err);
                throw new Error("Internal server error");
            }
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = mongoDb_1.client.db(mongoDb_1.dbName);
            const collection = db.collection("products");
            const products = yield collection.find().toArray();
            return products;
        });
    }
    getProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = mongoDb_1.client.db(mongoDb_1.dbName);
            const collection = db.collection("products");
            const objectId = new mongodb_1.ObjectId(id);
            const product = yield collection.findOne({ _id: objectId });
            if (product) {
                return product;
            }
            else {
                return "Product Not Found";
            }
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = mongoDb_1.client.db(mongoDb_1.dbName);
            const collection = db.collection("products");
            const objectId = new mongodb_1.ObjectId(id);
            console.log("ObjectId:", objectId);
            const result = yield collection.updateOne({ _id: objectId }, { $set: product });
            if (result.acknowledged && result.modifiedCount > 0) {
                return "Product Updated Successfully";
            }
            else {
                throw new Error("Error Updating Product");
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = mongoDb_1.client.db(mongoDb_1.dbName);
            const collection = db.collection("products");
            const objectId = new mongodb_1.ObjectId(id);
            console.log("ObjectId:", objectId);
            try {
                const result = yield collection.deleteOne({ _id: objectId });
                if (result.deletedCount === 1) {
                    return "Product Deleted Successfully";
                }
                else {
                    throw new Error("Product Not Found");
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    purchaseProduct(purchasedProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = mongoDb_1.client.db(mongoDb_1.dbName);
                const collection = db.collection("purchasedproducts");
                console.log("Inserting products:", purchasedProduct);
                const result = yield collection.insertOne(purchasedProduct);
                console.log(result);
            }
            catch (err) {
                console.error("Error adding products:", err);
                throw new Error("Internal server error");
            }
        });
    }
}
exports.default = new ProductServices();
