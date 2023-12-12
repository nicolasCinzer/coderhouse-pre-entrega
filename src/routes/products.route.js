import { Router } from 'express'
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'

export const router = Router()

router.get('/products', passport.authenticate('jwt', { session: false }), getProducts)

router.get('/products/:pid', passport.authenticate('jwt', { session: false }), getProductByID)

router.post('/products', passport.authenticate('jwt', { session: false }), createProduct)

router.put('/products/:pid', passport.authenticate('jwt', { session: false }), updateProduct)

router.delete('/products/:pid', passport.authenticate('jwt', { session: false }), deleteProduct)
