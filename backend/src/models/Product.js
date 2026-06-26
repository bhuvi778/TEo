import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    age: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    stock: { type: Number, default: 0 },
    badge: { type: String, default: 'New' },
    color: { type: String, default: 'from-sky-200 via-mint to-sun' },
    image: { type: String, default: '' },
    description: { type: String, required: true },
  },
  { timestamps: true },
)

export const Product = mongoose.model('Product', productSchema)
