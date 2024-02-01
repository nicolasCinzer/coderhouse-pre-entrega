import { AuthError, NotAllowedError } from '../errors/errors.js'
import { productsService } from '../services/products.service.js'

export const rolePermission = async (req, res, next) => {
  const { email, role } = req.user

  if (role === 'admin') return next()

  const { pid } = req.params

  const { owner } = await productsService.getProductById(pid)

  if (owner !== email) next(new NotAllowedError('Your user cant perform this action on this product. This is NOT your product!'))

  next()
}
