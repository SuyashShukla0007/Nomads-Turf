import mongoose from 'mongoose';


const playerSchema = new mongoose.Schema({
    socketId: String,  
    x: Number,
    y: Number,
    room: String,
    timestamp: { type: Date, default: Date.now }
});


const Player = mongoose.model('Player', playerSchema);

export default Player;
