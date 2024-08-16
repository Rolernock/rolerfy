import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  order: null,
  orders: []
}

export const placeOrder = createAsyncThunk(
  '/orders/createOrder',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/orders`, formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const getMyOrders = createAsyncThunk(
  '/orders/getMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/orders/myorders')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      rejectWithValue(errors)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  '/orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/orders/${orderId}`)
      return toast.success(data.msg)
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const getOrderById = createAsyncThunk(
  '/orders/getOrdersById',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(errors.msg)
      return rejectWithValue(errors)
    }
  }
)

export const payItems = createAsyncThunk(
  '/orders/payItems',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/orders/stkpush`, formData)
      return toast.success(data.msg)
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error))
      return rejectWithValue(errors)
    }
  }
)

export const updateOrderToPaid = createAsyncThunk(
  '/orders/updateOrderToPaid',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const getAllOrders = createAsyncThunk(
  '/orders/allOders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/orders')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error))
      return rejectWithValue(errors)
    }
  }
)

export const updateOrderToDelivered = createAsyncThunk(
  '/order/updateOrderToDelivered',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/deliver`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.order = action.payload
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.order = action.payload
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
  }
})

export default orderSlice.reducer
