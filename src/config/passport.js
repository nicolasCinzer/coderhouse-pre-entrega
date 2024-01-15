import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { usersService } from '../services/users.service.js'
import { UsersDTO } from '../DAL/dto/users.dto.js'
import { cartsService } from '../services/carts.service.js'
import {
  googleClientID,
  googleClientSecret,
  googleCallbackURL,
  gitHubClientID,
  gitHubCallbackURL,
  gitHubClientSecret,
  jwtSecretKey
} from './config.js'

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, _, __, done) => {
      try {
        const cart = await cartsService.createCart()

        const reqUser = UsersDTO.request({ ...req.body, cart: cart })

        const newUser = await usersService.create(reqUser)

        return done(null, newUser)
      } catch (error) {
        if (error.message.includesAll('duplicate key', 'email')) return done(null, false, { message: 'Email already exists!' })

        return done(error, null, { message: error.message })
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        const user = await usersService.checkPassword({ email, password })

        return done(null, user)
      } catch (error) {
        if (error.statusCode) return done(null, false)
        return done(error)
      }
    }
  )
)

passport.use(
  'github',
  new GitHubStrategy(
    {
      clientID: gitHubClientID,
      clientSecret: gitHubClientSecret,
      callbackURL: gitHubCallbackURL
    },
    async (accessToken, resfreshToken, profile, done) => {
      const { email, name } = profile._json

      try {
        const user = await usersService.findByEmail(email)

        if (user) {
          const { isGithub } = user

          if (isGithub) return done(null, user)

          if (!isGithub) return done(null, false)
        }

        const nameInfo = name.split(' ')
        const userInfo = {
          first_name: nameInfo[0],
          last_name: nameInfo[nameInfo.length - 1],
          email,
          isGithub: true
        }

        const newUser = await usersService.createFromGithub(userInfo)

        return done(null, newUser)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackURL
    },
    async (accessToken, resfreshToken, profile, done) => {
      const { email, name } = profile._json

      try {
        const user = await usersService.findByEmail(email)

        if (user) {
          const { isGithub } = user

          if (isGithub) return done(null, user)

          if (!isGithub) return done(null, false)
        }

        const nameInfo = name.split(' ')
        const userInfo = {
          first_name: nameInfo[0],
          last_name: nameInfo[nameInfo.length - 1],
          email,
          isGithub: true
        }

        const newUser = await usersService.createFromGithub(userInfo)

        return done(null, newUser)
      } catch (error) {
        return done(error)
      }
    }
  )
)

const fromCookies = req => {
  return req.cookies.token
}

passport.use(
  'current',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
      secretOrKey: jwtSecretKey
    },
    async (payload, done) => {
      const { email } = payload

      try {
        const user = await usersService.findByEmail(email)

        if (!user) return done(null, false)

        const res = UsersDTO.response(user)

        done(null, res)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  try {
    return done(null, user._id)
  } catch (error) {
    return done(error)
  }
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersService.findById(id)

    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

export default passport
