import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import orderReducer from './slices/orderSlice'
import cartReducer from './slices/cartSlice'

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    orders: orderReducer,
    cart: cartReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
