import { Router } from 'express'
import { router as cartsRouter } from './carts.route.js'
import { router as productsRouter } from './products.route.js'
import { router as viewsRouter } from './views.route.js'
import { router as sessionsRouter } from './sessions.route.js'

const router = Router()

const root = '/'
const api = '/api'

router.use(api, cartsRouter)
router.use(api, productsRouter)
router.use(root, viewsRouter)
router.use(api, sessionsRouter)

export default router
