import express from 'express';
const router = express.Router();

import { createRoom,getRoomById , joinRoom , getAllRooms} from '../controller/roomController.js';
import room from '../models/roomModel.js';
import { addTaskRoom, deleteTaskRoom , getAllTasksRoom } from '../controller/todoController.js';


/*
                                            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                                   VERY IMPORTANT INFORMATION
                                                   ROOM REFERS TO A WORKSPACE

*/

router.post('/create', createRoom);//{name,users,createdBy}
router.get('/:id', getRoomById);
router.post('/join', joinRoom); // {roomId,userId}
router.get('/all', getAllRooms);
router.post('/addTask',addTaskRoom);//{roomId,task}
router.post('/deleteTask',deleteTaskRoom);//{roomId,task}
router.post('/getAllTasks',getAllTasksRoom);//{roomId}

export default router;