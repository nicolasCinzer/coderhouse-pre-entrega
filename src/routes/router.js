import { Router } from 'express'
import { router as cartsRouter } from './carts.route.js'
import { router as productsRouter } from './products.route.js'
import { router as viewsRouter } from './views.route.js'
import { router as sessionsRouter } from './auth.route.js'
import { router as usersRouter } from './users.router.js'
import { router as testRouter } from './tests.route.js'

const router = Router()

const root = '/'
const api = '/api'

router.use(api, productsRouter)
router.use(api, cartsRouter)
router.use(api, sessionsRouter)
router.use(api, usersRouter)
router.use(api, testRouter)
router.use(root, viewsRouter)

export default router
