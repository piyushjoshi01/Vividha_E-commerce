import { Request, Response } from "express";
import userServices from "../../services/users/user.services";

class UserController {

  constructor() {}
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userServices.getAllUsers();

      if (users) {
        res.status(200).json({ users });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Unable to fetch the users" });
    }
  }


  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await userServices.getUserById(id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new UserController();
