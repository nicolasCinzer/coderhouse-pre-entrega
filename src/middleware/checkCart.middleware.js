import { ValidationError } from '../errors/errors.js'

export const checkCart = (req, res, next) => {
  const { cid } = req.params
  const { cart } = req.user

  if (!cart.equals(cid)) {
    throw new ValidationError('This is not your Cart')
  }

  next()
}
