import { userService } from '../dao/services/index.services.js'

const paths = {
  login: '/login',
  home: '/home'
}

export const signup = async (req, res, next) => {
  try {
    await userService.create(req.body)

    res.redirect(paths.login)
  } catch (err) {
    next(err)
  }
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

export const login = async (req, res, next) => {
  try {
    await userService.checkPassword(req.body)

    req.session.user = {
      email,
      first_name: user.first_name
    }

    res.redirect(paths.home)
  } catch (err) {
    if (err.status === 401) return res.redirect('/signup')

    next(err)
  }
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
