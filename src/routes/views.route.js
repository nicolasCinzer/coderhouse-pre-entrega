import { Router } from 'express'
import {
  renderCart,
  renderChat,
  renderHome,
  renderLogin,
  renderProfile,
  renderSignup,
  renderResetPasword,
  renderError,
  renderLoadDocuments
} from '../controllers/views.controller.js'
import passport from '../config/passport.js'

export const router = Router()

const passportOptions = { session: false, failureRedirect: '/login' }

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/chat', passport.authenticate('current', passportOptions), renderChat)

router.get('/home', passport.authenticate('current', passportOptions), renderHome)

router.get('/cart/:cid', passport.authenticate('current', passportOptions), renderCart)

router.get('/login', renderLogin)

router.get('/signup', renderSignup)

router.get('/profile', passport.authenticate('current', passportOptions), renderProfile)

router.get('/resetPassword', renderResetPasword)

router.get('/error', renderError)

router.get('/documents', passport.authenticate('current', passportOptions), renderLoadDocuments)
