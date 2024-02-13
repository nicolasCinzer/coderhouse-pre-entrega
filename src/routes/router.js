import { Router } from 'express'
import { router as cartsRouter } from './carts.route.js'
import { router as productsRouter } from './products.route.js'
import { router as viewsRouter } from './views.route.js'
import { router as sessionsRouter } from './auth.route.js'
import { router as usersRouter } from './users.router.js'
import { router as testRouter } from './tests.route.js'

import swaggerUi from 'swagger-ui-express'
import { swaggerSetup } from '../config/swagger.js'

const router = Router()

const root = '/'
const api = '/api'
const docs = '/api/docs'

router.use(api, productsRouter)
router.use(api, cartsRouter)
router.use(api, sessionsRouter)
router.use(api, usersRouter)
router.use(api, testRouter)
router.use(root, viewsRouter)
router.use(docs, swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export default router
