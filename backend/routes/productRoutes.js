import express from 'express'
const router = express.Router()
import {
    getProducts, 
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
    CreateProductReview,
} from '../controllers/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductsById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, CreateProductReview)
export default router