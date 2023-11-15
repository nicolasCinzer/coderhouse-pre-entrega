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

export const router = Router()

router.get('/chat', renderChat)

router.get('/home', renderHome)

router.get('/cart/:cid', renderCart)

router.get('/login', renderLogin)

router.get('/signup', renderSignup)

router.get('/profile', renderProfile)

router.get('/resetPassword', renderResetPasword)

router.get('/error', renderError)
