import { usersService } from '../services/users.service.js'
import { success } from '../utils/successResponse.js'

const paths = {
  login: '/login',
  home: '/home'
}

export const logout = async (req, res, next) => {
  const user = req.user

  try {
    await usersService.logout(user)

    res.clearCookie('token').send({ ok: true, message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const token = await usersService.login({ user: req.user })

    res.cookie('token', token, { httpOnly: true, maxAge: 60000 }).redirect('/home')
  } catch (error) {
    next(error)
  }
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
