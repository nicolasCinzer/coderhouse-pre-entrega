import { Router } from 'express'
import { saveDocuments, switchRole } from '../controllers/users.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import passport from '../config/passport.js'

export const router = Router()

router.get('/users/premium/:uid', switchRole)

router.post(
  '/users/:uid/documents',
  passport.authenticate('current', { session: false, failureRedirect: '/login' }),
  upload.fields([
    { name: 'id', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'bank', maxCount: 1 }
  ]),
  saveDocuments
)
