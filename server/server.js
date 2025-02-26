import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT||3000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import connectDB from "./config/dbConnect.js";
connectDB();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

import userRoutes from "./routes/userRoutes.js";
app.use("/user", userRoutes);

import roomRoutes from "./routes/roomRoutes.js";
app.use("/room", roomRoutes);

import documentRoutes from "./routes/documentRoutes.js";
app.use("/document", documentRoutes);