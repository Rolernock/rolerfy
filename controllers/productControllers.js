import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import ProductModel from '../models/ProductModel.js'

//@route -  GET - /api/products
//@desc - Get all products
//@access - Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 100
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}
  const productsCount = await ProductModel.countDocuments()
  const products = await ProductModel.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (!products) {
    res.status('404')
    throw new Error('No product found')
  }
  return res.json({
    products,
    page,
    pages: Math.ceil(productsCount / pageSize)
  })
})

//@route - GET - /api/products/top
//@desc - Get top 3 products
//@access - Public
export const topProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find().sort({ rating: -1 }).limit(3)
  if (!products) {
    res.status(404)
    throw new Error('No top product found')
  }
  return res.json(products)
})

//@route - GET - /api/products/:productId
//@desc - Get product by id
//@access - Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.productId)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  return res.json(product)
})

//@route - POST - /api/products
//@desc - Create Product
//@access - Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const createdProduct = await ProductModel.create({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: './images/sample.jpg',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  })
  return res.status(201).json(createdProduct)
})

//@route - PUT - /api/products/:productId
//@desc - Update product
//access - Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, category, countInStock, description } = req.body
  const product = await ProductModel.findById(req.params.productId)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  product.name = name !== undefined ? name : product.name
  product.price = price !== undefined ? price : product.price
  product.image = image !== undefined ? image : product.image
  product.category = category !== undefined ? category : product.category
  product.countInStock =
    countInStock !== undefined ? countInStock : product.countInStock
  product.description =
    description !== undefined ? description : product.description

  const updatedProduct = await product.save()
  return res.json(updatedProduct)
})

//@route - DELETE - /api/products/:productId
//@desc - Delete product
//@access - Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.productId)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  await ProductModel.findByIdAndDelete(product._id)
  res.json({ msg: 'Product deleted' })
})

//@route - POST - /api/product/:productId/reviews
//@desc - Add review
//@access - Private
export const reviewProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { comment, rating } = req.body
  const product = await ProductModel.findById(req.params.productId)
  const review = {
    user: req.user._id,
    name: req.user.name,
    comment,
    rating
  }
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  const alreadyReviewed = product.reviews.some(review =>
    review.user.equals(req.user._id)
  )
  if (alreadyReviewed) {
    res.status(400)
    throw new Error('Already reviewed this product')
  }
  product.reviews.push(review)
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length
  await product.save()
  return res.json(product.reviews)
})

//@route - DELETE - /api/products/:productId/:reviewId
//@desc - Delete Review
//@access - Private
export const deleteReview = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.productId)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  const reviewIndex = product.reviews.findIndex(
    review => review._id.toString() === req.params.reviewId
  )
  if (reviewIndex === -1) {
    res.status(404)
    throw new Error('Review not found')
  }
  product.reviews.splice(reviewIndex, 1)
  await product.save()
  return res.json({ msg: 'Review deleted' })
})
