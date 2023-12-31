import { Router } from 'express'
import {
  createCart,
  getCartByID,
  addProductToCart,
  addMultipleProductsToCart,
  deleteAllProductsFromCart,
  updateProductQty,
  deleteProductFromCart,
  purchase
} from '../controllers/carts.controller.js'
import { checkCart } from '../middleware/checkCart.middleware.js'
import passport from '../config/passport.js'

export const router = Router()

router.post('/carts', passport.authenticate('current', { session: false }), checkCart, createCart)

router.get('/carts/:cid', passport.authenticate('current', { session: false }), checkCart, getCartByID)

router.post('/carts/:cid', passport.authenticate('current', { session: false }), checkCart, addMultipleProductsToCart)

router.delete('/carts/:cid', passport.authenticate('current', { session: false }), checkCart, deleteAllProductsFromCart)

router.post('/carts/:cid/product/:pid', passport.authenticate('current', { session: false }), checkCart, addProductToCart)

router.put('/carts/:cid/product/:pid', passport.authenticate('current', { session: false }), checkCart, updateProductQty)

router.delete('/carts/:cid/product/:pid', passport.authenticate('current', { session: false }), checkCart, deleteProductFromCart)

router.post('/carts/:cid/purchase', passport.authenticate('current', { session: false }), checkCart, purchase)
