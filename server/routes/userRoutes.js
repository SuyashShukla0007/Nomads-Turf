import { loginUser,registerUser } from "../controller/userController.js";
import express from "express";
const router=express.Router();

router.post("/register",registerUser); //username , password , email
router.post("/login",loginUser);//username , password

export default router;