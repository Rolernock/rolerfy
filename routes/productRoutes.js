import express from 'express'
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  topProducts,
  reviewProduct,
  deleteReview
} from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { validateReview } from '../middleware/expressValidators.js'
const router = express.Router()

router.route('/').get(getAllProducts).post(protect, admin, createProduct)
router.get('/top', topProducts)
router
  .route('/:productId')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.post('/:productId/reviews', protect, validateReview, reviewProduct)
router.delete('/:productId/:reviewId', protect, deleteReview)
export default router
