import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import Player from "./models/playerModel.js";
import Document from "./models/DocumentModel.js";
import { Whiteboard } from "./models/whiteboardModel.js"; // Import the model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
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

  // Document collaboration
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
  // User joins a whiteboard room
  socket.on("join-whiteboard", async (roomId) => {
    socket.join(roomId);

    // Find or create a whiteboard for the room
    let whiteboard = await Whiteboard.findOne({ roomId });

    if (!whiteboard) {
      whiteboard = new Whiteboard({ roomId, drawings: [] });
      await whiteboard.save();
    }

    // Send existing drawings to the user
    socket.emit("load-whiteboard", whiteboard.drawings);
  });

  // Handle drawing events
  socket.on("draw", async ({ roomId, data }) => {
    try {
      const whiteboard = await Whiteboard.findOneAndUpdate(
        { roomId },
        { $push: { drawings: data } }, // Append new drawing data
        { new: true }
      );

      // Broadcast new drawing to other users
      socket.to(roomId).emit("draw", data);
    } catch (error) {
      console.error("Error saving drawing:", error);
    }
  });

  // Handle whiteboard clearing
  socket.on("clear-whiteboard", async (roomId) => {
    try {
      await Whiteboard.findOneAndUpdate({ roomId }, { drawings: [] }); // Clear in DB
      io.to(roomId).emit("clear-whiteboard"); // Notify all users
    } catch (error) {
      console.error("Error clearing whiteboard:", error);
    }
  });
  

});

// Start the server
server.listen(PORT, () => {
  console.log(`Socket Server is running on port ${PORT}`);
  console.log(`Access server on http://localhost:${PORT}`);
});