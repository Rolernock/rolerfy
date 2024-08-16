import { check } from 'express-validator'

export const validateNewUser = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').notEmpty()
]

export const validateUser = [
  check('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').notEmpty()
]

export const validateEmail = [
  check('email', 'Please provide a valid email').isEmail().normalizeEmail()
]

export const validatePassword = [
  check('password', 'Password is required').notEmpty()
]

export const validateReview = [
  check('rating', 'Rating is required').notEmpty(),
  check('comment', 'Comment is required').notEmpty()
]

export const validateOrders = [
  check('itemsPrice', 'Price is required').notEmpty(),
  check('shippingAddress', 'Shipping Address is required').notEmpty()
]
