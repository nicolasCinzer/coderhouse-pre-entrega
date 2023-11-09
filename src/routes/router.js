import { Router } from 'express'
import { router as cartsRouter } from './carts.route.js'
import { router as productsRouter } from './products.route.js'
import { router as viewsRouter } from './views.route.js'
import { router as sessionsRouter } from './sessions.route.js'

const router = Router()

const root = '/api'

router.use(root, cartsRouter)
router.use(root, productsRouter)
router.use('/', viewsRouter)
router.use(root, sessionsRouter)

export default router
