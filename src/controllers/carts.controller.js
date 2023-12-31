import { cartsService } from '../services/carts.service.js'
import { success } from '../utils/index.js'

export const getCartByID = async (req, res, next) => {
  const { cid } = req.params

  try {
    const cart = await cartsService.getCartById(cid)

    success({ res, message: 'Cart found!', features: cart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const createCart = async (_, res, next) => {
  try {
    const newCart = await cartsService.createCart()

    success({ res, message: 'Cart created successfully!', features: newCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const addProductToCart = async (req, res, next) => {
  const { cid, pid } = req.params

  try {
    const updatedCart = await cartsService.addProductToCart({ cid, pid })

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const addMultipleProductsToCart = async (req, res, next) => {
  const { cid } = req.params
  const { products } = req.body

  try {
    const updatedCart = await cartsService.addMultipleProducts({ cid, products })

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const updateProductQty = async (req, res, next) => {
  const { cid, pid } = req.params
  const { quantity } = req.body

  try {
    const updatedCart = await cartsService.updateQuantity({ cid, pid, quantity })

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

export const deleteProductFromCart = async (req, res, next) => {
  const { cid, pid } = req.params

  try {
    const updatedCart = await cartsService.deleteCartItem({ cid, pid })

    success({ res, message: 'Cart Updated!', features: updatedCart, status: 200 })
  } catch (err) {
    next(err)
  }
}

export const purchase = async (req, res, next) => {
  const { cid } = req.params
  const { email } = req.user

  try {
    const { ticket, nonStockedProducts } = await cartsService.purchaseItems({ cid, email })

    success({ res, message: 'Purchase complete', features: ticket, status: 200, restOfProperties: { nonStockedProducts } })
  } catch (err) {
    next(err)
  }
}
