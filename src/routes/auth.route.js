import { Router } from 'express'
import passport from '../config/passport.js'
import { signout, resetPassword, login, current, sendResetEmail } from '../controllers/auth.controller.js'
import { ValidationError } from '../errors/errors.js'
import { checkToken } from '../middleware/index.js'
import { success } from '../utils/successResponse.js'

export const router = Router()

router.post('/auth/signup', (req, res, next) => {
  passport.authenticate(
    'signup',
    {
      successRedirect: '/login'
    },
    (err, user, message) => {
      if (err) return next(err)

      if (!user) return next(new ValidationError(message))

      success({ res, message: 'User created successfully!' })
    }
  )(req, res, next)
})

router.post(
  '/auth/login',
  passport.authenticate('login', {
    failureRedirect: '/signup',
    session: false
  }),
  login
)

router.get('/auth/current', passport.authenticate('current', { session: false }), current)

router.post('/auth/signout', signout)

router.get('/auth/auth/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get(
  '/auth/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)

router.post('/auth/sendReset', sendResetEmail)

router.post('/auth/reset', checkToken, resetPassword) 
