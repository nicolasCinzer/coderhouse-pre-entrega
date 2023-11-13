import { Router } from 'express'
import passport from 'passport'
import { signup, signout, login, profile, resetPassword } from '../controllers/sessions.controller.js'

export const router = Router()

// router.post('/sessions/signup', signup)
router.post(
  '/sessions/signup',
  passport.authenticate('signup', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  })
)

router.post('/sessions/signout', signout)

// router.post('/sessions/login', login)
router.post(
  '/sessions/login',
  passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  })
)

router.get('/sessions/auth/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/sessions/callback', passport.authenticate('github'), (req, res) => {
  res.send('testing')
})

router.get('/sessions/profile', profile)

router.post('/sessions/resetPassword', resetPassword)
