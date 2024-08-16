import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { validateOrders } from '../middleware/expressValidators.js'
import { generateAccessToken } from '../middleware/generateAccessToken.js'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getAllOrders,
  stkPush,
  deleteOrder,
  updateOrderToDelivered
} from '../controllers/orderController.js'
const router = express.Router()

router
  .route('/')
  .post(protect, validateOrders, addOrderItems)
  .get(protect, admin, getAllOrders)
router.get('/myorders', protect, getMyOrders)
router.post('/stkpush', protect, generateAccessToken, stkPush)
router
  .route('/:orderId')
  .get(protect, getOrderById)
  .put(protect, admin, updateOrderToPaid)
  .delete(protect, admin, deleteOrder)
router.put('/:orderId/deliver', protect, admin, updateOrderToDelivered)
export default router
