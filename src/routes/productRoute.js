import express from 'express'
import { productController } from '../controllers/productController.js';
import { requireSignIn, adminMiddleware } from '../middlewares/middlewares.js';
import { createProductValidator, validateResult } from '../validators/validators.js';

const router = express.Router()

router.post('/createproduct', requireSignIn, adminMiddleware, createProductValidator, validateResult, productController.createProduct)
router.post('/updateproduct/:id', requireSignIn, adminMiddleware, productController.updateProduct)
router.delete('/deleteproduct/:id', requireSignIn, adminMiddleware, productController.deleteProduct)
router.get('/getsingleproduct/:id', productController.getSingleProduct)
router.get('/getallproducts', productController.getAllProducts)

export default router;
