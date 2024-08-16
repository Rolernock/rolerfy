import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import { format } from 'date-fns'
import OrderModel from '../models/OrderModel.js'
import axios from 'axios'

// Helper function
const findOrderById = async (res, orderId) => {
  const order = await OrderModel.findById(orderId).populate('user', [
    'name',
    'email'
  ])
  if (!order) {
    res.status(404)
    throw new Error('No orders found')
  }
  return order
}

//@route - POST - /api/orders
//@desc - Create a new Order
//@access - Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = req.body
  if (!orderItems || orderItems.length === 0) {
    res.status(400)
    throw new Error('No order Items')
  }

  const order = new OrderModel({
    orderItems,
    user: req.user._id,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  })
  const createdOrder = await order.save()
  return res.status(201).json(createdOrder)
})

//@route - GET - /api/orders/myorders
//@desc - Get logged in user orders
//@access - Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id })
  if (orders.length === 0) {
    res.status(404)
    throw new Error('No orders found')
  }
  return res.json(orders)
})

//@route - GET - /api/orders/:orderId
//@desc - Get order by id
//@access - Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await findOrderById(res, req.params.orderId)
  return res.json(order)
})

//@route - PUT - /api/orders/:orderId
//@desc - Update order to paid
//@access - Private/Admin
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await findOrderById(res, req.params.orderId)
  //   order.paymentResult = { id, status, update_time, email_address }
  order.isPaid = true
  order.paidAt = Date.now()
  await order.save()
  return res.json(order)
})

//@route - PUT - /api/orders/:orderId/deliver
//@desc - Update order to delivered
//@access - Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await findOrderById(res, req.params.orderId)
  order.isDelivered = true
  order.deliveredAt = Date.now()
  await order.save()
  return res.json(order)
})

//@route - DELETE - /api/orders/:orderId
//@desc - Delete order
//@access - Private
export const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params
  await findOrderById(res, orderId)
  if (!req.user.isAdmin) {
    res.status(403)
    throw new Error('Not allowed to delete this order')
  }
  await OrderModel.findByIdAndDelete(orderId)
  return res.json({ msg: 'Order deleted' })
})

//@route - PUT - /api/orders
//@desc - Get all orders
//@access - Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find().populate('user', ['name', 'email'])
  if (!orders) {
    res.status(404)
    throw new Error('No Orders found')
  }
  return res.json(orders)
})

//@route - POST - /api/orders/stkpush
//@desc - Initiate STK push
//@access - Private
export const stkPush = asyncHandler(async (req, res) => {
  const { phoneNumber, Amount } = req.body
  try {
    const telephone = `254${phoneNumber}`
    const tillNumber = '174379'
    const Timestamp = format(new Date(), 'yyyyMMddHHmmss')
    const passKey =
      'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    const url =
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    const config = {
      headers: {
        Authorization: `Bearer ${req.access_token}`
      }
    }
    //Generate base64 encoded password
    const generatePassword = (tillNumber, passKey, timestamp) => {
      const stringToEncode = `${tillNumber}${passKey}${timestamp}`
      const encodedPassword = Buffer.from(stringToEncode).toString('base64')
      return encodedPassword
    }
    const Password = generatePassword(tillNumber, passKey, Timestamp)
    const body = {
      BusinessShortCode: tillNumber,
      Password,
      Timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount,
      PartyA: telephone,
      PartyB: tillNumber,
      PhoneNumber: telephone,
      CallBackURL: 'https://dd3d-105-160-22-207.ngrok-free.app/callback',
      AccountReference: 'ROLERFY',
      TransactionDesc: 'Mpesa Daraja API STK push'
    }
    const { data } = await axios.post(url, body, config)
    return res.json({ msg: data.ResponseDescription })
  } catch (err) {
    res.status(400)
    throw new Error(err.response.data.errorMessage)
  }
})
