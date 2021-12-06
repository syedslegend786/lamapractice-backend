import express from 'express'
import { userController } from '../controllers/userController.js';
import { signupValidator, singinValidators, validateResult } from '../validators/validators.js';
import { adminMiddleware, requireSignIn } from '../middlewares/middlewares.js'
const router = express.Router()

router.post('/signup', signupValidator, validateResult, userController.signup)
router.post('/signin', singinValidators, validateResult, userController.signin)
router.post('/updateuser', requireSignIn, userController.updateUser)
router.get('/getallusers', requireSignIn, adminMiddleware, userController.getAllUsers)
router.get('/getuserstats', requireSignIn, adminMiddleware, userController.getUserStats)
router.get('/refreshToken', userController.refreshToken)
router.post('/logout', userController.logOut)

export default router;