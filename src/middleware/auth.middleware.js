import { AuthError } from '../errors/errors.js'

export const auth = (req, res, next) => {
  const { role } = req.user

  if (role !== 'admin') {
    throw new AuthError("Your account can't perform this action.")
  }

  next()
}
