import mongoose from "mongoose";

const whiteboardSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  drawings: { type: Array, default: [] }, // Stores all drawing actions
});

export const Whiteboard = mongoose.model("Whiteboard", whiteboardSchema);
