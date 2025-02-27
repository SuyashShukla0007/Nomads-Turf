import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConnect.js';
import Player from './models/playerModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5174",
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB
connectDB().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
    res.send("Hello from the socket server");
});

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('join', async ({ x, y, room }) => {
        try {
            // Store the player in the database
            const newPlayer = await Player.create({ socketId: socket.id, x, y, room });

            // Join the room
            socket.join(room);

            // Get all players in the room and send to the new player
            const players = await Player.find({ room });
            socket.emit('currentPlayers', players);

            // Notify others in the room about the new player
            socket.to(room).emit('newPlayer', { socketId: newPlayer.socketId, x, y });

        } catch (error) {
            console.error('Error adding player:', error);
            socket.emit('error', { message: 'Failed to join the game.' });
        }
    });

    socket.on('movement', async ({ x, y, room }) => {
        try {
            // Update the player's position in the database
            await Player.findOneAndUpdate({ socketId: socket.id }, { x, y });

            // Broadcast movement update only to others in the same room
            socket.to(room).emit('move', { socketId: socket.id, x, y });

        } catch (error) {
            console.error('Error updating movement:', error);
        }
    });

    socket.on('disconnect', async () => {
        try {
            // Remove player from the database
            const player = await Player.findOneAndDelete({ socketId: socket.id });

            if (player) {
                // Notify other players in the room that this player left
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