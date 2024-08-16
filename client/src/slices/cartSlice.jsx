import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {} }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find(
        currItem => currItem._id === item._id
      )
      if (existItem) {
        state.cartItems = state.cartItems.map(currItem =>
          currItem._id === existItem._id ? item : currItem
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter(currItem => currItem._id !== id)
      return updateCart(state)
    },
    clearCart: state => {
      state.cartItems = []
      localStorage.removeItem('cart')
      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updateCart(state)
    },
    clearShippingAddress: state => {
      state.shippingAddress = {}
      return updateCart(state)
    }
  }
})

export default cartSlice.reducer
export const {
  addToCart,
  removeFromCart,
  clearCart,
  saveShippingAddress,
  clearShippingAddress
} = cartSlice.actions
