import express from 'express';
import { createServer } from 'node:http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConnect.js';
import Player from './models/playerModel.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

await connectDB();

app.get("/", (req, res) => {
    res.send("Hello from the socket server");
});


io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('join', async (data) => {
        const { x, y, room } = data;

        try {
            await Player.create({ socketId: socket.id, x, y, room });
            socket.join(room);

            // Send all current players in the room to the new player
            const players = await Player.find({ room });
            socket.emit('currentPlayers', players);

            // Notify others about the new player
            socket.to(room).emit('newPlayer', { socketId: socket.id, x, y });
        } catch (error) {
            console.error('Error adding player:', error);
        }
    });

    socket.on('movement', async (data) => {
        const { x, y, room } = data;

        try {
            await Player.findOneAndUpdate({ socketId: socket.id }, { x, y });

            // Broadcast to all clients in the room except the sender
            socket.to(room).emit('movementUpdate', { socketId: socket.id, x, y });
        } catch (error) {
            console.error('Error updating movement:', error);
        }
    });

    socket.on('disconnect', async () => {
        console.log(`Player disconnected: ${socket.id}`);

        try {
            const player = await Player.findOneAndDelete({ socketId: socket.id });

            if (player) {
                socket.to(player.room).emit('playerLeft', { socketId: socket.id });
            }
        } catch (error) {
            console.error('Error removing player:', error);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Socket Server is running on port ${PORT}`);
    console.log(`Access server on http://localhost:${PORT}`);
});