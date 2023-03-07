import express from 'express'
import { addTask, forgotPassword, getMyProfile, login, logout, register, removeTask, resetPassword, updatePassword, updateProfile, updateTask, verify } from '../controllers/userController.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register)
router.route('/verify').post(isAuth,verify)
router.route('/login').post(login);
router.route('/logout').get(logout);

router.route('/addTask').post(isAuth,addTask)
router.route('/task/:taskId').get(isAuth,updateTask).delete(isAuth,removeTask)

router.route('/updateProfile').put(isAuth,updateProfile)
router.route('/updatePassword').put(isAuth,updatePassword)
router.route('/getProfile').get(isAuth,getMyProfile)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword').put(resetPassword)

export default router;