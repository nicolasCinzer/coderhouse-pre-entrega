import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GitHubStratergy } from 'passport-github2'
import { userService } from './dao/services/users.service.js'
import { compareData } from './utils.js'

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    async (req, email, password, done) => {
      const { first_name, last_name } = req.body

      if (!email || !password || !first_name || !last_name) {
        done(null, false)
      }

      const user = { first_name, last_name, email, password }

      try {
        const newUser = await userService.create(user)

        done(null, newUser)
      } catch (error) {
        done(error)
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
      if (!email || !password) {
        done(null, false)
      }
      try {
        const user = await userService.findByEmail(email)

        if (!user) done(null, false)

        const isCorrectPw = await compareData(password, user.password)

        if (!isCorrectPw) {
          done(null, false)
        }

        // const sessionInfo =
        //   email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
        //     ? {
        //         email,
        //         first_name: user.first_name,
        //         isAdmin: true
        //       }
        //     : {
        //         email,
        //         first_name: user.first_name,
        //         isAdmin: false
        //       }

        // req.session.user = sessionInfo

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'github',
  new GitHubStratergy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL
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

        const userInfo = {
          first_name: name.split(' ')[0],
          last_name: name.split(' ')[1],
          email,
          isGithub: true
        }

        const newUser = await userService.create(userInfo)

        done(null, newUser)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  try {
    const user = userService.findById(id)

    done(null, user)
  } catch (error) {
    done(error)
  }
})
