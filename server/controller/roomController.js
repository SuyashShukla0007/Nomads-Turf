import room from "../models/roomModel.js";
import User from "../models/userModel.js";

export const createRoom = async (req, res) =>{
    const {users,createdBy,name} = req.body;
    try {
        const newRoom = new room({
            name,
            users,
            createdBy
        });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const joinRoom= async(req,res)=>{
    const {id,userId}=req.body;
    const roomToJoin=await room.findById(id);
    if(roomToJoin.users.includes(userId)){
        res.status(400).json({message:"User already in room"});
        return;
    }
    roomToJoin.users.push(userId);
    await roomToJoin.save();
    res.status(200).json(roomToJoin);
}

export const getRoomById = async (req, res) =>{
    const roomid=req.params.id;
    const room1=await room.findById(roomid);
    res.status(200).json(room1);
}

export const getAllRooms= async(req,res)=>{
    const rooms=await room.find();
    res.status(200).json(rooms);
}
