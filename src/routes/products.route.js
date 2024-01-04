import { Router } from 'express'
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct, mockingProducts } from '../controllers/products.controller.js'
import passport from 'passport'
import { auth } from '../middleware/auth.middleware.js'

export const router = Router()

router.get('/products', getProducts)

router.get('/products/:pid', getProductByID)

router.post('/products', passport.authenticate('current', { session: false }), auth, createProduct)

router.put('/products/:pid', passport.authenticate('current', { session: false }), auth, updateProduct)

router.delete('/products/:pid', passport.authenticate('current', { session: false }), auth, deleteProduct)

router.get('/mockingproducts', mockingProducts)
