import jwt from 'jsonwebtoken'

const fallbackSecret = 'teomax-local-development-secret'

export function signToken(user) {
  return jwt.sign(
    {
      id: user._id?.toString?.() ?? user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET || fallbackSecret,
    { expiresIn: '7d' },
  )
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || fallbackSecret)
}
