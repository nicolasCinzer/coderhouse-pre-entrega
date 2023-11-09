import { productsService, cartsService } from '../dao/services/index.services.js'
import { success } from '../utils/index.js'

export const createCart = async (req, res, next) => {
  try {
    const newCart = await cartsService.createCart({ products: [] })

    success({ res, message: 'Cart created successfully!', features: newCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const getCartByID = async (req, res, next) => {
  const { cid } = req.params

  try {
    const cart = await cartsService.getCartById(cid)

    success({ res, message: 'Cart found!', features: cart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const addProductToCart = async (req, res, next) => {
  const { cid, pid } = req.params

  try {
    const product = await productsService.getProductById(pid)

    const updatedCart = await cartsService.addProduct(cid, product)

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const addMultipleProductsToCart = async (req, res, next) => {
  const { cid } = req.params
  const { products } = req.body

  try {
    const updatedCart = await cartsService.addMultipleProducts(cid, products)

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const deleteAllProductsFromCart = async (req, res, next) => {
  const { cid } = req.params

  try {
    const updatedCart = await cartsService.deleteAllProducts(cid)

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const updateProductQty = async (req, res, next) => {
  const { cid, pid } = req.params
  const { quantity } = req.body

  try {
    const product = await productsService.getProductById(pid)

    const updatedCart = await cartsService.updateQuantity(cid, product, quantity)

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const deleteProductFromCart = async (req, res, next) => {
  const { cid, pid } = req.params

  try {
    const product = await productsService.getProductById(pid)

    const updatedCart = await cartsService.deleteCartItem(cid, product)

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}
