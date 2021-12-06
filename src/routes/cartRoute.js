import express from 'express'
import { cartController } from '../controllers/cartController.js';
import { userMiddleware, requireSignIn, adminMiddleware } from '../middlewares/middlewares.js';
import { createCartValidator, validateResult } from '../validators/validators.js';

const router = express.Router()

router.post('/updatecart', requireSignIn, userMiddleware, createCartValidator, validateResult, cartController.updateCart)
router.delete('/deltecart', requireSignIn, userMiddleware, cartController.deleteCart)
router.get('/deltecart', requireSignIn, userMiddleware, cartController.getUserCart)
router.get('/getallcarts', requireSignIn, adminMiddleware, cartController.getAllCarts)


export default router;
