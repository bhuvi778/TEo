import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()
const port = process.env.PORT || 5000
const allowedOrigins = getAllowedOrigins()

await connectDB()

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'teomax-backend' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(error.status || 500).json({ message: error.message || 'Server error' })
})

app.listen(port, () => {
  console.log(`TEOMax backend running on http://localhost:${port}`)
})

function getAllowedOrigins() {
  const configured = process.env.CLIENT_URLS || process.env.CLIENT_URL
  const fallback = 'http://localhost:5173,http://localhost:5175'
  return (configured || fallback)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}
