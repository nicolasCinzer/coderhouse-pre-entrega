import { cartsModel } from '../models/carts.model.js'
import { NotAvailableError, NotFoundError } from '../../errors/errors.js'

export const getCartById = async (_id, populate = false) => {
  let cart = await cartsModel.findOne({ _id })

  if (!cart) throw new NotFoundError(`Cart identified by ID: '${id}' not Found`)

  if (populate) return cart.populate('products.product')

  return cart
}

export const createCart = async () => cartsModel.create({})

export const addProductToCart = async ({ cart, pid }) => {
  const index = cart.products.findIndex(({ product }) => product.equals(pid))

  index > -1 ? cart.products[index].quantity++ : cart.products.push({ product: pid })

  return cart.save()
}

export const updateQuantity = async ({ cart, pid, quantity }) => {
  const index = cart.products.findIndex(({ product }) => product.equals(pid))

  if (index === -1) throw new NotAvailableError('This item is not in the Cart!')

  cart.products[index].quantity = quantity

  return cart.save()
}

export const deleteAllProducts = async cart => {
  cart.products = []

  return cart.save()
}

export const deleteCartItem = async ({ cart, pid }) => {
  const index = cart.products.findIndex(item => item.product.equals(pid))

  if (index === -1) throw new NotAvailableError('This item has already been deleted.')

  cart.products = cart.products.filter(item => !item.product.equals(pid))

  return cart.save()
}

export default {
  getCartById,
  createCart,
  addProductToCart,
  updateQuantity,
  deleteAllProducts,
  deleteCartItem
}
