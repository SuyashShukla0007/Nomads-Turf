import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    users:{ // stores the id of users stored
        type:Array,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    todo:{
        type:Array,
        default:[]
    }
})

const room=mongoose.model('room',roomSchema);
export default room;