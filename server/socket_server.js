import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConnect.js';
import Player from './models/playerModel.js';
import Document from './models/DocumentModel.js';

import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/dbConnect.js"
import Player from "./models/playerModel.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

await connectDB()

app.get("/", (req, res) => {
  res.send("Hello from the socket server")
})
const emailToSocketIdMap = new Map()
const socketidToEmailMap = new Map()

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`)

  socket.on("join", async (data) => {
    const { x, y, room } = data

    try {
      await Player.create({ socketId: socket.id, x, y, room })
      socket.join(room)

      // Send all current players in the room to the new player
      const players = await Player.find({ room })
      socket.emit("currentPlayers", players)

      // Notify others about the new player
      socket.to(room).emit("newPlayer", { socketId: socket.id, x, y })
    } catch (error) {
      console.error("Error adding player:", error)
    }
    });

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
    })

  socket.on("movement", async (data) => {
    const { x, y, room } = data

    try {
      await Player.findOneAndUpdate({ socketId: socket.id }, { x, y })

      // Broadcast to all clients in the room except the sender
      socket.to(room).emit("movementUpdate", { socketId: socket.id, x, y })
    } catch (error) {
      console.error("Error updating movement:", error)
    }
  })

  socket.on("disconnect", async () => {
    console.log(`Player disconnected: ${socket.id}`)

    try {
      const player = await Player.findOneAndDelete({ socketId: socket.id })

      if (player) {
        socket.to(player.room).emit("playerLeft", { socketId: socket.id })
      }
    } catch (error) {
      console.error("Error removing player:", error)
    }
  })
  //web rtc server
  socket.on("room:join", (data) => {
    const { email, room } = data
    emailToSocketIdMap.set(email, socket.id)
    socketidToEmailMap.set(socket.id, email)
    io.to(room).emit("user:joined", { email, id: socket.id })
    socket.join(room)
    io.to(socket.id).emit("room:join", data)
  })

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer })
  })

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans })
  })

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer)
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer })
  })

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans)
    io.to(to).emit("peer:nego:final", { from: socket.id, ans })
  })
})

server.listen(PORT, () => {
  console.log(`Socket Server is running on port ${PORT}`)
  console.log(`Access server on http://localhost:${PORT}`)
})
