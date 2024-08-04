"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../../controllers/authentication/auth.controller"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post("/signUpUser", auth_controller_1.default.signUpUser);
router.post("/loginUser", auth_controller_1.default.loginUser);
exports.default = router;
