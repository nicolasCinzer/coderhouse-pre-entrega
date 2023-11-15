import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GitHubStratergy } from 'passport-github2'
import { userService } from './dao/services/users.service.js'

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
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, email, password, done) => {
      try {
        const user = await userService.checkPassword({ email, password })

        const sessionInfo =
          email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASSWORD
            ? {
                email,
                first_name: user.first_name,
                isAdmin: true
              }
            : {
                email,
                first_name: user.first_name,
                isAdmin: false
              }

        return done(null, sessionInfo)
      } catch (error) {
        if (error.statusCode) return done(null, false)
        return done(error)
      }
    }
  )
)

passport.use(
  'github',
  new GitHubStratergy(
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
