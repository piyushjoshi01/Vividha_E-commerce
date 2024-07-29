import { ObjectId } from "mongodb";
import { client, dbName } from "../../config/mongoDb";
import { User } from "../../types/userType";

class UserServices {
  constructor() {}
  async getAllUsers() {
    try {
      const db = client.db(dbName);
      const collection = db.collection<User>("users");

      const users = await collection.find().toArray();

      return users;
    } catch (err) {
      console.error("Failed to fetch Users:", err);
      throw new Error("Failed to fetch Users");
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<User>("users");

      const objectId = new ObjectId(id);

      // Fetch the developer
      const user = await collection.findOne({ _id: objectId });

      return user;
    } catch (errors) {
      console.error("Failed to fetch User:", errors);
      throw new Error("Failed to fetch User");
    }
  }
}

export default new UserServices();
