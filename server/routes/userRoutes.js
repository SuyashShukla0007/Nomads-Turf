//import { loginUser,registerUser,getUserById } from "../controller/userController.js";
import { login, registerUser, logout } from "../controller/loginController.js"
import {
  addTaskUser,
  deleteTaskUser,
  getAllTasksUser,
} from "../controller/todoController.js"
import express from "express"
const router = express.Router()

router.post("/register", registerUser) //username , password , email
router.post("/login", login) //username , password
//router.get("/getUserById", getUserById) //id
router.post("/addTask", addTaskUser) //userId , task
router.post("/deleteTask", deleteTaskUser) //userId , task
router.get("/getAllTasks", getAllTasksUser) //userId
export default router
