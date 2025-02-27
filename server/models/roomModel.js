import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  users: {
    // stores the id of users stored
    type: Array,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const room = mongoose.model("room", roomSchema);
export default room;
