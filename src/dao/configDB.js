import { connect } from 'mongoose'
import DB_URL from './dbUrl.js'

connect(DB_URL)
  .then(console.log('DB Connected!'))
  .catch(err => console.log(err))
