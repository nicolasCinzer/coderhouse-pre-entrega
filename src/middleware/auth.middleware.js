import { NotAllowedError } from '../errors/errors.js'

export const auth = (req, res, next) => {
  const { role } = req.user

  if (!['admin', 'premium'].includes(role)) return next(new NotAllowedError("Your account can't perform this action."))

  next()
}
