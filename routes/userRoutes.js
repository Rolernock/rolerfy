import express from 'express'
import {
  validateNewUser,
  validateEmail,
  validateUser,
  validatePassword
} from '../middleware/expressValidators.js'
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsersById,
  getAllUsers,
  logOut,
  deleteUser,
  resetPassword,
  resetPasswordEmail,
  updateUser
} from '../controllers/userControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .post(validateNewUser, registerUser)
  .get(protect, admin, getAllUsers)
router.post('/auth', validateUser, authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.post('/forgot-password', validateEmail, resetPasswordEmail)
router.post('/reset-password/:token', validatePassword, resetPassword)
router.post('/logout', logOut)
router
  .route('/:userId')
  .get(protect, admin, getUsersById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)

export default router
