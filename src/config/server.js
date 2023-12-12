// External Dependencies
import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import 'dotenv/config.js'

// Internal Dependencies
import Routes from '../routes/router.js'
import errorHandler from '../middleware/errorHandler.middleware.js'
import { messagesService } from '../services/index.services.js'
import passport from './passport.js'

export const runApp = () => {
  const app = express()

  app.use(express.json())
  app.use(express.static(process.cwd() + '/public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY))

  // Handlebars
  app.engine('handlebars', engine())
  app.set('view engine', 'handlebars')
  app.set('views', process.cwd() + '/views')

  // Session
  app.use(
    session({
      secret: process.env.COOKIE_SECRET_KEY,
      cookie: { maxAge: 60000 }
    })
  )

  // Passport
  app.use(passport.initialize())

  // Routes
  app.use('/', Routes)

  // Errors
  app.use(errorHandler)

  // Connection
  const httpServer = app.listen(process.env.PORT, () => {
    console.log(`Server listening @ http://localhost:${process.env.PORT}`)
  })

  return httpServer
}

export const runSocket = httpServer => {
  const socketServer = new Server(httpServer)

  socketServer.on('connection', socket => {
    socket.on('newUser', user => {
      socket.broadcast.emit('newUserConnected', user)
    })

    socket.on('newMessage', async ({ user, message }) => {
      if (!message) return

      await messagesService.addMessage(user, message)

      const messages = await messagesService.getMessages()
      socketServer.emit('chat', messages)
    })
  })
}
