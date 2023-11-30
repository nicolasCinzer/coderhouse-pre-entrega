import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { userService } from '../services/index.services.js'

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, _, __, done) => {
      try {
        const newUser = await userService.create(req.body)

        return done(null, newUser)
      } catch (error) {
        return done(error)
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
        const user = await userService.checkPassword({ email, password })

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
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, resfreshToken, profile, done) => {
      const { email, name } = profile._json

      try {
        const user = await userService.findByEmail(email)

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

        const newUser = await userService.createFromGithub(userInfo)

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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, resfreshToken, profile, done) => {
      const { email, name } = profile._json

      try {
        const user = await userService.findByEmail(email)

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

        const newUser = await userService.createFromGithub(userInfo)

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
      secretOrKey: process.env.JWT_SECRET_KEY
    },
    async (payload, done) => {
      const { email } = payload

      try {
        const user = await userService.findByEmail(email)

        if (!user) return done(null, false)

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
      secretOrKey: process.env.JWT_SECRET_KEY
    },
    async (payload, done) => {
      const { email } = payload

      try {
        const user = await userService.findByEmail(email)

        if (!user) return done(null, false)

        done(null, user)
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
    const user = await userService.findById(id)

    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

export default passport
