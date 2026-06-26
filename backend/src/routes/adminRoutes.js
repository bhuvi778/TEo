import { Router } from 'express'
import { isMongoReady } from '../config/db.js'
import { Product } from '../models/Product.js'
import { Order } from '../models/Order.js'
import { User } from '../models/User.js'
import { requireAdmin, requireAuth } from '../middleware/auth.js'
import { memoryStore } from '../store/memoryStore.js'

const router = Router()

router.get('/summary', requireAuth, requireAdmin, async (req, res) => {
  if (isMongoReady()) {
    const [products, users, orders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.find(),
    ])
    const revenue = orders.reduce((sum, order) => sum + order.total, 0)
    return res.json({ products, users, orders: orders.length, revenue })
  }

  const revenue = memoryStore.orders.reduce((sum, order) => sum + order.total, 0)
  return res.json({
    products: memoryStore.products.length,
    users: memoryStore.users.length,
    orders: memoryStore.orders.length,
    revenue,
  })
})

router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  const users = isMongoReady()
    ? await User.find().select('-passwordHash').sort({ createdAt: -1 })
    : memoryStore.users.map(({ passwordHash, ...user }) => user)
  return res.json({ users })
})

export default router
