import express from "express";
import authController from "../../controllers/authentication/auth.controller";

const router = express.Router();

router.use(express.json());

router.post("/signUpUser", authController.signUpUser);
router.post("/loginUser", authController.loginUser);

export default router;
