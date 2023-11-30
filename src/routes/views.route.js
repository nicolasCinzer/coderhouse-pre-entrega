import { Router } from 'express'
import {
  renderCart,
  renderChat,
  renderHome,
  renderLogin,
  renderProfile,
  renderSignup,
  renderResetPasword,
  renderError
} from '../controllers/views.controller.js'
import passport from 'passport'

export const router = Router()

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/chat', passport.authenticate('jwt', { session: false }), renderChat)

router.get('/home', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), renderHome)

router.get('/cart/:cid', passport.authenticate('jwt', { session: false }), renderCart)

router.get('/login', renderLogin)

router.get('/signup', renderSignup)

router.get('/profile', passport.authenticate('jwt', { session: false }), renderProfile)

router.get('/resetPassword', renderResetPasword)

router.get('/error', renderError)
