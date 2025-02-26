import express from 'express';
const router = express.Router();

import { createRoom,getRoomById , joinRoom , getAllRooms} from '../controller/roomController.js';
import room from '../models/roomModel.js';


/*
                                            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                                   VERY IMPORTANT INFORMATION
                                                   ROOM REFERS TO A WORKSPACE

*/

router.post('/create', createRoom);//{name,users,createdBy}
router.get('/:id', getRoomById);
router.post('/join', joinRoom); // {roomId,userId}
router.get('/all', getAllRooms);

export default router;