import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import authServices from "../../services/authentication/auth.services";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (username: any) => {
  return jwt.sign({ username }, "secret string to remember", {
    expiresIn: maxAge,
  });
};
class AuthController {
  constructor() {}

  async signUpUser(req: Request, res: Response): Promise<void> {
    const user = req.body;
    const { username, email, mobile, password } = user;

    if (!username || !email || !mobile || !password) {
      res.status(400).json({ message: "missing details" });
    } else {
      const successfullRegister = await authServices.signUpUser(user);
      console.log(successfullRegister);

      if (successfullRegister === "User created successfully") {
        const token = createToken(user.username);

        res.status(201).json({ token });
      } else {
        res.status(400).json({ message: successfullRegister });
      }
    }
  }
  async loginUser(req: Request, res: Response): Promise<void> {
    const user = req.body;
    const { username, password } = user;

    if (!username || !password) {
      res.status(400).json({ message: "missing details" });
    } else {
      const loginMessage = await authServices.loginUser(username, password);

      if (loginMessage === "Login successful") {
        const token = createToken(user.username);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Failed to Login" });
      }
    }
  }
}

export default new AuthController();
