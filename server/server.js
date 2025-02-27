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

const corsOptions = {
  origin: (origin, callback) => {
      const allowedOrigins = [process.env.CORS_ORIGIN ,'http://localhost:5173', 'http://127.0.0.1'];
      if (allowedOrigins.includes(origin) || !origin) {
          // Allow no origin (when the request is made by the server itself, for example)
          callback(null, true);
      } else {
          callback(new Error('CORS policy does not allow this origin.'));
      }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // This is important to allow credentials
  optionsSuccessStatus: 204, // For legacy browsers
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

import userRoutes from "./routes/userRoutes.js";
app.use("/user", userRoutes);

import roomRoutes from "./routes/roomRoutes.js";
app.use("/room", roomRoutes);

import documentRoutes from "./routes/documentRoutes.js";
app.use("/document", documentRoutes);

import geminiRoutes from "./routes/geminiRoutes.js";
app.use("/gemini", geminiRoutes);

import authRoutes from "./routes/authRoutes.js"
app.use("/auth",authRoutes);