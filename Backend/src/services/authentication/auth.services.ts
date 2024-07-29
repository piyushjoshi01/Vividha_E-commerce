import { client, dbName } from "../../config/mongoDb";
import { User } from "../../types/userType";
import bcrypt from "bcrypt";

class AuthServcies {
  constructor() {}

  async signUpUser(user: User): Promise<string> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<User>("users");

      const existingUser = await collection.findOne({
        username: user.username,
      });

      if (existingUser) {
        return "User already exists";
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const result = await collection.insertOne(user);
      if (result.insertedId) {
        return "User created successfully";
      } else {
        throw new Error("User creation failed");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      throw new Error("Internal server error");
    }
  }
  async loginUser(username: string, password: string): Promise<string> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<User>("users");

      const user = await collection.findOne({ username });

      if (!user) {
        return "User not found";
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return "Invalid credentials";
      }

      return "Login successful";
    } catch (err) {
      console.error("Error logging in user:", err);
      throw new Error("Internal server error");
    }
  }
}

export default new AuthServcies();
