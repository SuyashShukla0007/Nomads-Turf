import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import Player from "./models/playerModel.js";
import Document from "./models/DocumentModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
await connectDB();

app.get("/", (req, res) => {
  res.send("Hello from the socket server");
});

const players = {};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Handle player joining
  socket.on("join", async (playerInfo) => {
    players[socket.id] = {
      socketId: socket.id,
      x: playerInfo.x,
      y: playerInfo.y,
    };
    socket.join(playerInfo.room);
    socket.emit("currentPlayers", Object.values(players));
    socket.broadcast.emit("newPlayer", players[socket.id]);
  });

  // Handle player movement
  socket.on("movement", async (data) => {
    const { x, y, room } = data;

    try {
      if (players[socket.id]) {
        players[socket.id].x = x;
        players[socket.id].y = y;

        // Broadcast to all clients in the room except the sender
        socket.to(room).emit("movementUpdate", { socketId: socket.id, x, y });
      }
    } catch (error) {
      console.error("Error updating movement:", error);
    }
  });

  // Handle player disconnection
  socket.on("disconnect", async () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    socket.broadcast.emit("playerDisconnected", socket.id);
  });
  // Example valid ObjectId

  socket.on("join-doc", async (docId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(docId)) {
        console.error("Invalid document ID:", docId);
        return socket.emit("error", "Invalid document ID");
      }

      const documentId = new mongoose.Types.ObjectId(docId);
      socket.join(docId);
      const doc = await Document.findById(documentId);

      if (doc) {
        socket.emit("load-doc", doc.content);
      } else {
        socket.emit("error", "Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      socket.emit("error", "Server error");
    }
  });

  socket.on("edit-doc", async ({ content }) => {
    const docId = "65dfe3b5c9a5b93f8a4e9d2a"; // Example document ID
    socket.to(docId).emit("update-doc", content);

    // Optionally, save the content to the database
    await Document.findByIdAndUpdate(docId, { content }, { new: true });
  });

  // WebRTC signaling
  socket.on("room:join", (data) => {
    const { email, room } = data;
    socket.join(room);
    io.to(room).emit("user:joined", { email, id: socket.id });
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Socket Server is running on port ${PORT}`);
  console.log(`Access server on http://localhost:${PORT}`);
});
