import bcrypt from 'bcryptjs'
import { seedProducts, seedUsers } from '../data/seed.js'

const passwordHashes = await Promise.all(
  seedUsers.map(async (user) => ({
    ...user,
    passwordHash: await bcrypt.hash(user.password, 10),
    password: undefined,
  })),
)

export const memoryStore = {
  products: [...seedProducts],
  users: passwordHashes,
  orders: [],
}
