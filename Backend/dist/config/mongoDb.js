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
exports.dbName = exports.client = void 0;
exports.connectDB = connectDB;
const mongodb_1 = require("mongodb");
const url = "mongodb+srv://piyushwork706:w3MRrhBx7ZXjKjbz@cluster0.jpjpfvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "VividhaDB";
exports.dbName = dbName;
const client = new mongodb_1.MongoClient(url);
exports.client = client;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.log("Error connecting to MongoDB:", error);
            throw error;
        }
    });
}
