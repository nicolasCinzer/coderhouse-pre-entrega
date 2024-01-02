import { databaseURI } from './config.js'
import { connect } from 'mongoose'

export const connectDB = () => {
  connect(databaseURI)
    .then(console.log('DB Connected!'))
    .catch(err => console.log(err))
}
