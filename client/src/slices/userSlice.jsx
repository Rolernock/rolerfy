import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  users: [],
  profile: null
}

export const registerUser = createAsyncThunk(
  '/users/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', formData)
      toast.success('Registration successful')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const login = createAsyncThunk(
  '/users/login',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/auth', formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const getUserProfile = createAsyncThunk(
  '/users/getUserProfile',
  async (profileId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/${profileId}`)
      return data
    } catch (error) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  '/users/updateUserProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/api/users/profile', formData)
      toast.success('User updated.')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const getUserById = createAsyncThunk(
  '/users/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error))
      return rejectWithValue(errors)
    }
  }
)

export const getAllusers = createAsyncThunk(
  '/users/allUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/users')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const logOut = createAsyncThunk(
  '/users/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/logout')
      return toast.success(data.msg)
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deleteUser = createAsyncThunk(
  '/users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/users/${userId}`)
      return toast.success(data.msg)
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const resetPassword = createAsyncThunk(
  '/users/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/users/reset-password/${token}`, {
        password
      })
      return toast.success(data.msg)
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const resetPasswordEmail = createAsyncThunk(
  '/users/resetPasswordEmail',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/users/forgot-password`, { email })
      return toast.success(data.msg)
    } catch (err) {
      const errors = err.response.data.errors
      console.log(err.response.data)
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

export const updateProfileByAdmin = createAsyncThunk(
  '/users/updateProfileByAdmin',
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`, formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(error => toast.error(error.msg))
      return rejectWithValue(errors)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(registerUser.rejected, state => {
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(login.rejected, state => {
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(updateProfileByAdmin.fulfilled, (state, action) => {
        state.profile = action.payload
      })
  }
})

export default userSlice.reducer
