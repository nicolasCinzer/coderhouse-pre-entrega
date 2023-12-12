import { Router } from 'express'
import passport from 'passport'
import { generateToken } from '../utils/generateToken.js'
import { signout, profile, resetPassword, login, current } from '../controllers/sessions.controller.js'

export const router = Router()

router.post(
  '/sessions/signup',
  passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/error'
  })
)

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

router.get('/sessions/profile', profile)

router.post('/sessions/resetPassword', resetPassword)
