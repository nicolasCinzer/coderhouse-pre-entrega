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
import passport from 'passport'

export const router = Router()

router.post('/carts', passport.authenticate('jwt', { session: false }), createCart)

router.get('/carts/:cid', passport.authenticate('jwt', { session: false }), getCartByID)

router.put('/carts/:cid', passport.authenticate('jwt', { session: false }), addMultipleProductsToCart)

router.delete('/carts/:cid', passport.authenticate('jwt', { session: false }), deleteAllProductsFromCart)

router.post('/carts/:cid/product/:pid', passport.authenticate('jwt', { session: false }), addProductToCart)

router.put('/carts/:cid/product/:pid', passport.authenticate('jwt', { session: false }), updateProductQty)

router.delete('/carts/:cid/product/:pid', passport.authenticate('jwt', { session: false }), deleteProductFromCart)
