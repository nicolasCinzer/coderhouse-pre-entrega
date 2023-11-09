import { Router } from 'express'
import { userService } from '../dao/services/index.services.js'
import { success } from '../utils/index.js'
import { AuthError, ValidationError } from '../errors/errors.js'

export const router = Router()

router.post('/sessions/signup', async (req, res, next) => {
  try {
    await userService.create(req.body)

    res.redirect('/login')
  } catch (err) {
    next(err)
  }
})

router.post('/sessions/login', async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw new ValidationError('Some data is missing!')
    }

    const user = await userService.findByEmail(req.body.email)

    if (!user) res.redirect('/signup')

    if (password !== user.password) {
      throw new AuthError('Password is not valid.')
    }

    req.session.user = {
      email,
      first_name: user.first_name
    }

    res.redirect('/home')
  } catch (err) {
    next(err)
  }
})

router.get('/sessions/profile')
