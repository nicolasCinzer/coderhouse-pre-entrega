import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '../config/config.js'

export const generateToken = payload => {
  return jwt.sign(payload, jwtSecretKey, { expiresIn: '5m' })
}

export const readToken = token => {
  return jwt.verify(token, jwtSecretKey)
}
