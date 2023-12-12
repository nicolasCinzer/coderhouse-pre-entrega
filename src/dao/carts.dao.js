import { cartsModel } from '../models/carts.model.js'
import { NotAvailableError, OutOfStockError } from '../errors/errors.js'

export const getCartById = async _id => {
  try {
    return cartsModel.findOne({ _id }).populate('products.product')
  } catch (err) {
    throw new Error(err)
  }
}

export const createCart = async cart => {
  try {
    return cartsModel.create(cart)
  } catch (err) {
    throw new Error(err)
  }
}

export const addProductToCart = async ({ cart, pid }) => {
  const pid = product._id

  try {
    const index = cart.products.findIndex(item => item.product.equals(pid))

    index > -1 ? cart.products[index].quantity++ : cart.products.push({ product: pid })

    return cart.save()
  } catch (err) {
    throw new Error(err)
  }
}

export const addMultipleProducts = async (cart, products) => {
  try {
    cart.products = products

    return cart.save()
  } catch (err) {
    throw new Error(err)
  }
}

export const updateQuantity = async (cart, product = {}, quantity) => {
  const pid = product._id

  try {
    const index = cart.products.findIndex(item => item.product.equals(pid))

    if (index === -1) throw new NotAvailableError('This item is not in the Cart!')

    const updatedStock = product.stock - (quantity - cart.products[index].quantity)

    if (updatedStock < 0) throw new OutOfStockError('This item is out of stock! Please submit a lower quantity.')

    cart.products[index].quantity = quantity

    return cart.save()
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteAllProducts = async cart => {
  try {
    cart.products = []

    return cart.save()
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteCartItem = async (cart, product = {}) => {
  const pid = product._id

  try {
    const index = cart.products.findIndex(item => item.product.equals(pid))

    if (index === -1) throw new NotAvailableError('This item has already been deleted.')

    cart.products = cart.products.filter(item => !item.product.equals(pid))

    return cart.save()
  } catch (err) {
    throw new Error(err)
  }
}

export default {
  getCartById,
  createCart,
  addProductToCart,
  addMultipleProducts,
  updateQuantity,
  deleteAllProducts,
  deleteCartItem
}
