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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_services_1 = __importDefault(require("../../services/authentication/auth.services"));
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
    return jsonwebtoken_1.default.sign({ username }, "secret string to remember", {
        expiresIn: maxAge,
    });
};
class AuthController {
    constructor() { }
    signUpUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const { username, email, mobile, password } = user;
            if (!username || !email || !mobile || !password) {
                res.status(400).json({ message: "missing details" });
            }
            else {
                const successfullRegister = yield auth_services_1.default.signUpUser(user);
                console.log(successfullRegister);
                if (successfullRegister === "User created successfully") {
                    const token = createToken(user.username);
                    res.status(201).json({ token });
                }
                else {
                    res.status(400).json({ message: successfullRegister });
                }
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const { username, password } = user;
            if (!username || !password) {
                res.status(400).json({ message: "missing details" });
            }
            else {
                const loginMessage = yield auth_services_1.default.loginUser(username, password);
                if (loginMessage === "Login successful") {
                    const token = createToken(user.username);
                    res.status(200).json({ token });
                }
                else {
                    res.status(401).json({ message: "Failed to Login" });
                }
            }
        });
    }
}
exports.default = new AuthController();
