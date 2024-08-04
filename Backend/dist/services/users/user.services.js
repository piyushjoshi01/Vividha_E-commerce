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
const mongodb_1 = require("mongodb");
const mongoDb_1 = require("../../config/mongoDb");
class UserServices {
    constructor() { }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = mongoDb_1.client.db(mongoDb_1.dbName);
                const collection = db.collection("users");
                const users = yield collection.find().toArray();
                return users;
            }
            catch (err) {
                console.error("Failed to fetch Users:", err);
                throw new Error("Failed to fetch Users");
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = mongoDb_1.client.db(mongoDb_1.dbName);
                const collection = db.collection("users");
                const objectId = new mongodb_1.ObjectId(id);
                // Fetch the developer
                const user = yield collection.findOne({ _id: objectId });
                return user;
            }
            catch (errors) {
                console.error("Failed to fetch User:", errors);
                throw new Error("Failed to fetch User");
            }
        });
    }
}
exports.default = new UserServices();
