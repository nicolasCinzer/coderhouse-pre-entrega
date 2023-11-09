import { Router } from 'express'
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'

export const router = Router()

router.get('/products', getProducts)

router.get('/products/:pid', getProductByID)

router.post('/products', createProduct)

router.put('/products/:pid', updateProduct)

router.delete('/products/:pid', deleteProduct)
