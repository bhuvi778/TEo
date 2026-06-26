import { Router } from 'express'
import { z } from 'zod'
import { isMongoReady } from '../config/db.js'
import { Order } from '../models/Order.js'
import { memoryStore } from '../store/memoryStore.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const orderSchema = z.object({
  user: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    role: z.string().default('customer'),
  }),
  items: z.array(
    z.object({
      id: z.string().optional(),
      productId: z.string().optional(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().int().positive(),
      image: z.string().optional(),
    }),
  ),
  details: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    pincode: z.string(),
    payment: z.string(),
  }),
  total: z.number().nonnegative(),
  status: z.string().default('Processing').optional(),
})

router.get('/', requireAuth, async (req, res) => {
  const orders = isMongoReady()
    ? await Order.find(req.user.role === 'admin' ? {} : { 'user.email': req.user.email }).sort({
        createdAt: -1,
      })
    : memoryStore.orders.filter(
        (order) => req.user.role === 'admin' || order.user.email === req.user.email,
      )
  res.json({ orders })
})

router.post('/', async (req, res) => {
  const parsed = orderSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message })

  const order = {
    ...parsed.data,
    id: `TMX-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  }

  if (isMongoReady()) {
    const created = await Order.create(parsed.data)
    return res.status(201).json({ order: created })
  }

  memoryStore.orders.unshift(order)
  return res.status(201).json({ order })
})

export default router
