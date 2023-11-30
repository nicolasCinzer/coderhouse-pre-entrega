import { Router } from 'express'
import passport from 'passport'
import { generateToken } from '../utils/generateToken.js'
import { signout, profile, resetPassword } from '../controllers/sessions.controller.js'

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
  (req, res) => {
    const payload = {
      email: req.user.email,
      first_name: req.user.first_name
    }

    const token = generateToken(payload)

    res.cookie('token', token, { maxAge: 60000, httpOnly: true }).redirect('/home')
  }
)

router.get('/sessions/current', passport.authenticate('current', { session: false }), (req, res) => {
  res.json({ user: req.user })
})

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

const userController = function (req, res) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json('invalid credentials')
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.redirect('/')
    })
  })(req, res)
}
