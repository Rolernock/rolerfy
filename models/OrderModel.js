import mongoose from 'mongoose'
const { Schema } = mongoose

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        }
      }
    ],
    shippingAddress: {
      phoneNumber: Number,
      county: String,
      postalCode: Number,
      sub_county: String,
      ward: String
    },
    paymentMethod: {
      type: String,
      default: 'Mpesa'
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String
    },
    itemsPrice: {
      type: Number,
      default: 0.0
    },
    taxPrice: {
      type: Number,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: Date
  },
  { timestamps: true }
)

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel
