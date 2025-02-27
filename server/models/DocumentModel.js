import mongoose from "mongoose";
const documentSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const document=mongoose.model('document',documentSchema);

export default document;