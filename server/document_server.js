import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import Document from "./models/Document.js";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("HyperPad MERN Server Running!");
});

// API to get a document by ID
// app.get("/docs/:id", async (req, res) => {
//   try {
//     const doc = await Document.findById(req.params.id);
//     if (!doc) {
//       return res.status(404).json({ message: "Document not found" });
//     }
//     res.json(doc);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // API to create a new document
// app.post("/docs", async (req, res) => {
//   try {
//     const newDoc = new Document({ content: "", title: "Untitled" });
//     await newDoc.save();
//     res.json(newDoc);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating document" });
//   }
// });

// **Socket.io for Real-time Collaboration**
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-doc", async (docId) => {
    socket.join(docId);
    const doc = await Document.findById(docId);
    if (doc) {
      socket.emit("load-doc", doc.content);
    }
  });

  socket.on("edit-doc", async ({ docId, content }) => {
    await Document.findByIdAndUpdate(docId, { content });
    socket.to(docId).emit("update-doc", content);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
