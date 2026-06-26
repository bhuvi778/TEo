import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Product } from '../models/Product.js'
import { User } from '../models/User.js'
import { seedProducts, seedUsers } from '../data/seed.js'

export function isMongoReady() {
  return mongoose.connection.readyState === 1
}

export async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.log('MongoDB not configured. Backend is using in-memory data.')
    return false
  }

  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
    await seedDatabase()
    return true
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`)
    console.warn('Backend is continuing with in-memory data.')
    return false
  }
}

async function seedDatabase() {
  const productCount = await Product.countDocuments()
  if (!productCount) {
    await Product.insertMany(seedProducts)
  }

  const userCount = await User.countDocuments()
  if (!userCount) {
    const users = await Promise.all(
      seedUsers.map(async (user) => ({
        name: user.name,
        email: user.email,
        role: user.role,
        passwordHash: await bcrypt.hash(user.password, 10),
      })),
    )
    await User.insertMany(users)
  }
}
