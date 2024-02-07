import { AuthError, ValidationError } from '../errors/errors.js'
import { usersService } from '../services/users.service.js'
import { checkExpiration, readToken } from '../utils/index.js'

export const checkToken = async (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1]

  const payload = readToken(token)

  const { email, iat } = payload

  if (checkExpiration(iat)) next(new AuthError('Token has expired.'))

  const user = await usersService.findByEmail(email)

  if (!user) return next(new ValidationError('User not found.'))

  req.payload = email

  next()
}
