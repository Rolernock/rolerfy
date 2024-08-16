import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import { validationResult } from 'express-validator'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'
import UserModel from '../models/UserModel.js'

//Helper function
const findUserById = asyncHandler(async (userId, res) => {
  const user = await UserModel.findById(userId).select('-password')
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  return user
})

//@route - POST - /api/users
//@desc - Register user
//@access - Public
export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { name, email, password } = req.body
  let user = await UserModel.findOne({ email })
  if (user) {
    res.status(400)
    throw new Error('User already exists')
  }
  user = await UserModel.create({ name, email, password })
  generateToken(res, user._id)
  return res.json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    _id: user._id,
    createdAt: user.createdAt
  })
})

//@route - POST - /api/users/auth
//@desc - Login
//@access - Public
export const authUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('Invalid user or password')
  }
  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    res.status(400)
    throw new Error('Invalid user or password')
  }

  generateToken(res, user._id)
  return res.json({
    name: user.name,
    email: user.email,
    _id: user._id,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt
  })
})

//@route - POST - /api/users
//desc - Logout user
//@access - Public
export const logOut = (req, res) => {
  res.clearCookie('jwt')
  res.json({ msg: 'Logged out successfully' })
}

//@route - GET /api/users/profile
//@desc - Get User profile
//@access - Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id).select('-password')
  return res.json(user)
})

//@route - PUT - /api/users/profile
//@desc - Update user profile
//@access - Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const user = await findUserById(req.user._id, res)

  user.name = name !== undefined ? name : user.name
  user.email = email !== undefined ? email : user.email
  user.password = password !== undefined ? password : user.password
  await user.save()

  return res.json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  })
})

//@route - GET - /api/users
//@desc - Get All Users
//@access - Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find().select('-password')
  if (!users) {
    res.status(404)
    throw new Error('Users not found')
  }

  return res.json(users)
})

//@route - GET - /api/users/:userId
//@desc - Get Users by Id
//@access - Private/Admin
export const getUsersById = asyncHandler(async (req, res) => {
  const user = await findUserById(req.params.userId, res)
  return res.json(user)
})

//@route - DELETE - /api/users/:userId
//@desc - Delete user
//@access - Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await findUserById(req.params.userId, res)
  if (user.isAdmin) {
    res.status(403)
    throw new Error('You cannot delete admin user')
  }
  await UserModel.findByIdAndDelete(user._id)
  return res.json({ msg: 'User deleted' })
})

//@route - PUT - /api/users/:userId
//@desc - Update User By Id
//@access - Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body
  const user = await UserModel.findById(req.params.userId)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  user.name = name !== undefined ? name : user.name
  user.email = email !== undefined ? email : user.email
  user.password = password !== undefined ? password : user.password
  user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin
  await user.save()
  return res.json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  })
})

//@route - POST - /api/users/forgot-password
//@desc - Send reset password email
//@access - Public
export const resetPasswordEmail = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { email } = req.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  const token = await user.getResetPasswordToken()
  await user.save()
  const resetUrl = `rolerfy.xyz/reset-password/${token}`
  try {
    sendEmail({
      to: email,
      subject: 'Reset Password',
      text: `You requested for a password reset, please click the link below and you'll be redirected to your reset password page
        
        
        ${resetUrl}`
    })
    return res.json({ msg: 'Email sent, please check your inbox' })
  } catch (err) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    res.status(500)
    throw new Error(err)
  }
})

//@route - POST - /api/users/reset-password/:token
//desc - Reset password
//@access - Public
export const resetPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if (!user) {
    res.status(404)
    throw new Error('Invalid or expired token')
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  return res.json({ msg: 'Password reset was successfull' })
})
