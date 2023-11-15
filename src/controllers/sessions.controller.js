import { userService } from '../dao/services/index.services.js'

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
