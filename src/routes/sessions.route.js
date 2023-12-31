import { Router } from 'express'
import passport from '../config/passport.js'
import { signout, resetPassword, login, current } from '../controllers/sessions.controller.js'
import { ValidationError } from '../errors/errors.js'

export const router = Router()

router.post('/sessions/signup', (req, res, next) => {
  passport.authenticate(
    'signup',
    {
      successRedirect: '/login'
    },
    (err, user, { message }) => {
      if (err) return next(err)

      if (!user) return next(new ValidationError(message))
    }
  )(req, res, next)
})

router.post(
  '/sessions/login',
  passport.authenticate('login', {
    failureRedirect: '/signup'
  }),
  login
)

router.get('/sessions/current', passport.authenticate('current', { session: false }), current)

router.post('/sessions/signout', signout)

router.get('/sessions/auth/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get(
  '/sessions/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)

router.post('/sessions/resetPassword', resetPassword)
