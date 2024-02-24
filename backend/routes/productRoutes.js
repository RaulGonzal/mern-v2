import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  CreateProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, checkObjectId, CreateProductReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductsById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
