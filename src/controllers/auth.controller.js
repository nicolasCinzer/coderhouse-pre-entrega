import { usersService } from '../services/users.service.js'
import { success } from '../utils/successResponse.js'

const paths = {
  login: '/login',
  home: '/home'
}

export const signout = async (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.redirect(paths.login)
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res) => {
  const { email, first_name } = req.user

  const token = await usersService.login({ email, first_name })

  res.cookie('token', token, { maxAge: 600000, httpOnly: true }).redirect('/home')
}

export const current = async (req, res) => {
  res.json({ user: req.user })
}

export const sendResetEmail = async (req, res, next) => {
  const { email } = req.body

  try {
    const { url, token } = await usersService.sendResetPasswordMail(email)

    success({ res, message: `Reset password email sended to ${email}!`, features: { url, token } })
  } catch (err) {
    next(err)
  }
}

export const resetPassword = async (req, res, next) => {
  const { password } = req.body
  const email = req.payload

  try {
    const updatedUser = await usersService.updatePassword({ email, password })

    success({ res, message: `Reset password successfully for ${email}!`, features: updatedUser })
  } catch (err) {
    if (err.status === 401) return res.redirect('/signup')

    next(err)
  }
}
