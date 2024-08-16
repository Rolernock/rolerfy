import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        name: {
          type: String,
          required: true
        },
        rating: Number,
        comment: {
          type: String,
          required: true
        }
      }
    ],
    rating: {
      type: Number,
      default: 0
    },
    price: Number,
    countInStock: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel
