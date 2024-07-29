import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
import http from "http";
import { connectDB } from "./config/mongoDb";
import router from "./indexRouters";
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app);

(async function startServer() {
  try {
    await connectDB();
    server.listen(8000, () => {
      console.log(`Server is listening on http://localhost:8000`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit the process with an error code
  }
})();
app.use("/", router);
