import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'

const initialState = {
  product: null,
  topProducts: [],
  products: []
}

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/products`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async ({ pageNumber = 1, keyword = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/products?pageNumber=${pageNumber}&keyword=${keyword}`
      )
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ formData, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, formData)
      toast.success(`Product Updated.`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`)
      return toast.success(data.msg)
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const getTopProducts = createAsyncThunk(
  'products/topProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/top`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const reviewProduct = createAsyncThunk(
  'products/reviewProduct',
  async ({ reviewData, _id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/products/${_id}/reviews`,
        reviewData
      )
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const uploadProductImage = createAsyncThunk(
  '/products/uploadProductImage',
  async (imageData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/uploads`, imageData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const deleteReview = createAsyncThunk(
  '/products/deleteReview',
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/products/${productId}/${reviewId}`
      )
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product = action.payload
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload
      })
  }
})

export default productSlice.reducer
