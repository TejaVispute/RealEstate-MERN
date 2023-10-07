import express from 'express';
import { updateUserCtrl, userController } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get("/test", userController);
router.post("/updateuser/:id", verifyToken, updateUserCtrl)

export default router