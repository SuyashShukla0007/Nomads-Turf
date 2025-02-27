import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import mongoose from "mongoose";

export const addTaskUser = async (req,res)=>{
    const {userId,task}=req.body;
    const user=await User.findById(userId);
    user.todo.push(task);
    await user.save();
    res.status(200).json(user);
}

export const addTaskRoom = async(req,res)=>{
    const {roomId,task}=req.body;
    const roomToEdit=await room.findById(roomId);
    roomToEdit.todo.push(task);
    await roomToEdit.save();
    res.status(200).json(roomToEdit);
}

export const deleteTaskUser = async(req,res)=>{
    const {userId,task}=req.body;
    const user=await User.findById(userId);
    user.todo=user.todo.filter((t)=>t!==task);
    await user.save();
    res.status(200).json(user);
}

export const deleteTaskRoom = async(req,res)=>{
    const {roomId,task}=req.body;
    const roomToEdit=await room.findById(roomId);
    roomToEdit.todo=roomToEdit.todo.filter((t)=>t!==task);
    await roomToEdit.save();
    res.status(200).json(roomToEdit);
}

export const getAllTasksUser = async(req,res)=>{
    const {userId}=req.body;
    const user=await User.findById(userId);
    res.status(200).json(user.todo);
}

export const getAllTasksRoom = async (req, res) => {
    try {
        const { roomId } = req.body; 
        console.log("Received roomId:", roomId); // Debugging log

        if (!roomId) {
            return res.status(400).json({ message: "Room ID is required" });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ message: "Invalid Room ID format" });
        }

        const roomToEdit = await Room.findById(roomId);
        if (!roomToEdit) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json(roomToEdit.todo || []);
    } catch (error) {
        console.error("Error fetching room:", error); // Debugging log
        res.status(500).json({ message: "Internal Server Error" });
    }
};