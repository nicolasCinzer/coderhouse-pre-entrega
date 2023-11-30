import { runApp, runSocket } from './config/server.js'
import { connectDB } from './config/connectDB.js'

const start = () => {
  const server = runApp()

  runSocket(server)

  connectDB()
}

start()
