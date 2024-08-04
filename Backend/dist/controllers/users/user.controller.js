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
const user_services_1 = __importDefault(require("../../services/users/user.services"));
class UserController {
    constructor() { }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_services_1.default.getAllUsers();
                if (users) {
                    res.status(200).json({ users });
                }
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ message: "Unable to fetch the users" });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield user_services_1.default.getUserById(id);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: "User not found" });
                }
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.default = new UserController();
