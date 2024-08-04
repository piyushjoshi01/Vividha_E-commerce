"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../controllers/users/user.controller"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get("/getUser/:id", user_controller_1.default.getUserById);
router.get("/getUsers", user_controller_1.default.getAllUsers);
exports.default = router;
