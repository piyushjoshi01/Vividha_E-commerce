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
const mongoDb_1 = require("../../config/mongoDb");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthServcies {
    constructor() { }
    signUpUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = mongoDb_1.client.db(mongoDb_1.dbName);
                const collection = db.collection("users");
                const existingUser = yield collection.findOne({
                    username: user.username,
                });
                if (existingUser) {
                    return "User already exists";
                }
                const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
                user.password = hashedPassword;
                const result = yield collection.insertOne(user);
                if (result.insertedId) {
                    return "User created successfully";
                }
                else {
                    throw new Error("User creation failed");
                }
            }
            catch (err) {
                console.error("Error creating user:", err);
                throw new Error("Internal server error");
            }
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = mongoDb_1.client.db(mongoDb_1.dbName);
                const collection = db.collection("users");
                const user = yield collection.findOne({ username });
                if (!user) {
                    return "User not found";
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return "Invalid credentials";
                }
                return "Login successful";
            }
            catch (err) {
                console.error("Error logging in user:", err);
                throw new Error("Internal server error");
            }
        });
    }
}
exports.default = new AuthServcies();
