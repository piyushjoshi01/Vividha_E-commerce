import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://piyushwork706:w3MRrhBx7ZXjKjbz@cluster0.jpjpfvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "VividhaDB";
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
}

// const groups = [
//   {
//     groupId: "1",
//     name: "Code Collab Group"
//   },
//   {
//     groupId: "2",
//     name: "UUID Open-source Group"
//   },
//   {
//     groupId: "3",
//     name: "Flask Open-source Group"
//   }
// ];

// const messages = [
//   {
//     message: "Welcome to the Code Collab Group!",
//     user: { username: "user1", name: "User One" },
//     groupId: "1",
//     timestamp: new Date()
//   },
//   {
//     message: "Hi everyone! Excited to collaborate.",
//     user: { username: "user2", name: "User Two" },
//     groupId: "1",
//     timestamp: new Date()
//   },
//   {
//     message: "Welcome to the UUID Open-source Group!",
//     user: { username: "user1", name: "User One" },
//     groupId: "2",
//     timestamp: new Date()
//   },
//   {
//     message: "Hello, looking forward to open-source contributions!",
//     user: { username: "user3", name: "User Three" },
//     groupId: "2",
//     timestamp: new Date()
//   },
//   {
//     message: "Welcome to the Flask Open-source Group!",
//     user: { username: "user1", name: "User One" },
//     groupId: "3",
//     timestamp: new Date()
//   },
//   {
//     message: "Let's build something awesome with Flask!",
//     user: { username: "user4", name: "User Four" },
//     groupId: "3",
//     timestamp: new Date()
//   }
// ];

// async function insertDummyData() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");

//     const db = client.db(dbName);
//     const groupsCollection = db.collection("groups");
//     const messagesCollection = db.collection("chats");

//     await groupsCollection.insertMany(groups);
//     await messagesCollection.insertMany(messages);

//     console.log("Inserted dummy data");
//   } catch (error) {
//     console.error("Error inserting dummy data:", error);
//   } finally {
//     await client.close();
//   }
// }

// // insertDummyData();

export { client, connectDB, dbName };
