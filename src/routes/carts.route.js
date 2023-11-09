import { Router } from 'express'
import {
  createCart,
  getCartByID,
  addProductToCart,
  addMultipleProductsToCart,
  deleteAllProductsFromCart,
  updateProductQty,
  deleteProductFromCart
} from '../controllers/carts.controller.js'

export const router = Router()

router.post('/carts', createCart)

router.get('/carts/:cid', getCartByID)

router.put('/carts/:cid', addMultipleProductsToCart)

router.delete('/carts/:cid', deleteAllProductsFromCart)

router.post('/carts/:cid/product/:pid', addProductToCart)

router.put('/carts/:cid/product/:pid', updateProductQty)

router.delete('/carts/:cid/product/:pid', deleteProductFromCart)
