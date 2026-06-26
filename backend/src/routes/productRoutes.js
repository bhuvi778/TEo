import { Router } from 'express'
import { z } from 'zod'
import { isMongoReady } from '../config/db.js'
import { Product } from '../models/Product.js'
import { requireAdmin, requireAuth } from '../middleware/auth.js'
import { memoryStore } from '../store/memoryStore.js'

const router = Router()

const productSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  brand: z.string().min(2),
  category: z.string().min(2),
  age: z.string().min(2),
  price: z.number().nonnegative(),
  rating: z.number().min(0).max(5).default(4.5),
  stock: z.number().int().nonnegative().default(0),
  badge: z.string().default('New'),
  color: z.string().default('from-sky-200 via-mint to-sun'),
  image: z.string().optional().default(''),
  description: z.string().min(10),
})

router.get('/', async (req, res) => {
  const products = isMongoReady()
    ? await Product.find().sort({ createdAt: -1 })
    : memoryStore.products
  res.json({ products })
})

router.get('/:id', async (req, res) => {
  const product = isMongoReady()
    ? await Product.findOne({ id: req.params.id })
    : memoryStore.products.find((item) => item.id === req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  return res.json({ product })
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const parsed = productSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message })

  if (isMongoReady()) {
    const product = await Product.findOneAndUpdate({ id: parsed.data.id }, parsed.data, {
      new: true,
      upsert: true,
    })
    return res.status(201).json({ product })
  }

  const index = memoryStore.products.findIndex((item) => item.id === parsed.data.id)
  if (index >= 0) memoryStore.products[index] = parsed.data
  else memoryStore.products.unshift(parsed.data)
  return res.status(201).json({ product: parsed.data })
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  if (isMongoReady()) {
    await Product.deleteOne({ id: req.params.id })
  } else {
    memoryStore.products = memoryStore.products.filter((item) => item.id !== req.params.id)
  }
  return res.json({ ok: true })
})

export default router
