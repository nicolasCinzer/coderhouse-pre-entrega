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
import passport from '../config/passport.js'

export const router = Router()

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/chat', passport.authenticate('current', { session: false }), renderChat)

router.get('/home', passport.authenticate('current', { session: false, failureRedirect: '/login' }), renderHome)

router.get('/cart/:cid', passport.authenticate('current', { session: false }), renderCart)

router.get('/login', renderLogin)

router.get('/signup', renderSignup)

router.get('/profile', passport.authenticate('current', { session: false }), renderProfile)

router.get('/resetPassword', renderResetPasword)

router.get('/error', renderError)
