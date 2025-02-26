import { loginUser,registerUser,getUserById } from "../controller/userController.js";
import express from "express";
const router=express.Router();

router.post("/register",registerUser); //username , password , email
router.post("/login",loginUser);//username , password
router.get("/getUserById",getUserById);//id

export default router;