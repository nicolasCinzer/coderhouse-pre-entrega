import { Router } from 'express'
import { switchRole } from '../controllers/users.controller.js'

export const router = Router()

router.get('/users/premium/:uid', switchRole)
