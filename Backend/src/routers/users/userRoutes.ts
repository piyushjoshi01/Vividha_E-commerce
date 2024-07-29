import express from "express";

import userController from "../../controllers/users/user.controller";

const router = express.Router();

router.use(express.json());

router.get("/getUser/:id", userController.getUserById);
router.get("/getUsers", userController.getAllUsers);

export default router;
