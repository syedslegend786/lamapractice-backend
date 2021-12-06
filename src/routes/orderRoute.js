import express from 'express'
import { orderController } from '../controllers/orderController.js';
import { adminMiddleware, requireSignIn, userMiddleware } from '../middlewares/middlewares.js';
import { createOrderValidator } from '../validators/validators.js';
const router = express.Router()

router.post('/createorder', requireSignIn, userMiddleware, createOrderValidator, orderController.createOrder)
router.get('/getuserorders', requireSignIn, userMiddleware, orderController.getUserOrders)
router.get('/getallordersadmin', requireSignIn, adminMiddleware, orderController.getAllOrders)
router.get('/geticomestatsforadminpannel', requireSignIn, adminMiddleware, orderController.getMonthlyIcomeStatics)

export default router;
