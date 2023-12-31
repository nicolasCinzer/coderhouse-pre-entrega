import { usersService } from '../services/users.service.js'

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

export const resetPassword = async (req, res, next) => {
  const { email, password } = req.body

  try {
    await usersService.updatePassword({ email, password })

    res.redirect(paths.login)
  } catch (err) {
    if (err.status === 401) return res.redirect('/signup')

    next(err)
  }
}
