import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthCallback = async (req, res) => {
    try {
      console.log("Starting Google Auth Callback");
      const { token } = req.query;
      // console.log("Token received:", token);
        console.log( process.env.GOOGLE_CLIENT_ID);
        
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // console.log("Google token verified");
  
      const payload = ticket.getPayload();
      const { email, name, picture } = payload;
      // console.log("Payload ", payload);
      
      // console.log("Payload extracted:", { email, name});
  
      let user = await User.findOne({ email });
      // console.log("User found:", user);
  
      if (!user) {
        // console.log("User not found, creating new user");
        const hashedPassword = await bcrypt.hash("Google Login", 10);
        user = await User.create({ username:name, email, password: hashedPassword });
        console.log("User created:", user);
      }
  
      const jwt_token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
      );
      // console.log("JWT token generated");
  
      return res.status(200).json({
        message: 'Login successful',
        token: jwt_token,
        email: user.email,
        name: user.username,
        success: true
      });
    } catch (error) {
      console.error("Google authentication failed:", error);
      res.status(500).json({ message: "Authentication failed", error });
    }
  };