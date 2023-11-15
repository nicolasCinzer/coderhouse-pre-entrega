import { Router } from 'express'
import passport from 'passport'
import { signout, profile, resetPassword } from '../controllers/sessions.controller.js'

export const router = Router()

router.post(
  '/sessions/signup',
  passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/error'
  })
)

router.post('/sessions/signout', signout)

router.post(
  '/sessions/login',
  passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/signup'
  })
)

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
