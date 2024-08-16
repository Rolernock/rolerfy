import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import ConnectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config()
const PORT = process.env.PORT || 8000

const app = express()

//Parse JSON file
app.use(express.json())

//Parse Cookie
app.use(cookieParser())

//Resolving __dirname for ES Module
const __dirname = path.resolve()

//Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

//Use the client app
app.use(express.static(path.join(__dirname, '/client/dist')))

//User Uploads for image upload
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//Render the client app
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
)

//Error Handlers Middleware
app.use(notFound)
app.use(errorHandler)

ConnectDB()
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
