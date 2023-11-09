// External Dependencies
import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import session from 'express-session'

// Internal Dependencies
import DB_URL from './dao/dbUrl.js'
import './dao/configDB.js'
import Routes from './routes/router.js'
import errorHandler from './middleware/errorHandler.middleware.js'
import { messagesService } from './dao/services/messages.service.js'

const app = express()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('cacioypepe'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', process.cwd() + '/src/views')

app.use(
  session({
    store: new MongoStore({
      mongoUrl: DB_URL
    }),
    secret: 'cacioypepe',
    cookie: { maxAge: 60000 }
  })
)

app.use('/', Routes)

app.use(errorHandler)

const PORT = 8080
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening @ http://localhost:${PORT}`)
})
/* Socket */

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
