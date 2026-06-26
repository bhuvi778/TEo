import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { isMongoReady } from '../config/db.js'
import { User } from '../models/User.js'
import { memoryStore } from '../store/memoryStore.js'
import { signToken } from '../utils/token.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const authSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['customer', 'admin']).default('customer').optional(),
})

router.post('/register', async (req, res) => {
  const parsed = authSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message })

  const { name, email, password, role = 'customer' } = parsed.data
  const passwordHash = await bcrypt.hash(password, 10)

  if (isMongoReady()) {
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already registered' })
    const user = await User.create({ name: name || email.split('@')[0], email, passwordHash, role })
    return res.status(201).json({ user: publicUser(user), token: signToken(user) })
  }

  const exists = memoryStore.users.find((user) => user.email === email.toLowerCase())
  if (exists) return res.status(409).json({ message: 'Email already registered' })
  const user = {
    id: crypto.randomUUID(),
    name: name || email.split('@')[0],
    email: email.toLowerCase(),
    role,
    passwordHash,
  }
  memoryStore.users.push(user)
  return res.status(201).json({ user: publicUser(user), token: signToken(user) })
})

router.post('/login', async (req, res) => {
  const parsed = authSchema.pick({ email: true, password: true }).safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message })

  const { email, password } = parsed.data
  const user = isMongoReady()
    ? await User.findOne({ email: email.toLowerCase() })
    : memoryStore.users.find((item) => item.email === email.toLowerCase())

  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const matches = await bcrypt.compare(password, user.passwordHash)
  if (!matches) return res.status(401).json({ message: 'Invalid credentials' })

  return res.json({ user: publicUser(user), token: signToken(user) })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

function publicUser(user) {
  return {
    id: user._id?.toString?.() ?? user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export default router
