import { userService } from '../services/index.services.js'

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
  const payload = {
    email: req.user.email,
    first_name: req.user.first_name
  }

  const token = generateToken(payload)

  res.cookie('token', token, { maxAge: 60000, httpOnly: true }).redirect('/home')
}

export const current = async (req, res) => {
  res.json({ user: req.user })
}

export const profile = () => {}

export const resetPassword = async (req, res, next) => {
  try {
    await userService.updatePassword(req.body)

    res.redirect(paths.login)
  } catch (err) {
    if (err.status === 401) return res.redirect('/signup')

    next(err)
  }
}
