import { NotAllowedError } from '../errors/errors.js'
import { productsService } from '../services/products.service.js'

export const checkProduct = async (req, res, next) => {
  const { pid } = req.params
  const { email, role } = req.user

  const { owner } = await productsService.getProductById(pid)

  if (role === 'premium' && owner === email) return next(new NotAllowedError("Your account can't perform this action."))

  next()
}
