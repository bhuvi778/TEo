import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      name: String,
      email: String,
      role: String,
    },
    items: [orderItemSchema],
    details: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      payment: String,
    },
    total: { type: Number, required: true },
    status: { type: String, default: 'Processing' },
  },
  { timestamps: true },
)

export const Order = mongoose.model('Order', orderSchema)
