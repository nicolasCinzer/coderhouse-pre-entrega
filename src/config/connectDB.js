import { connect } from 'mongoose'

export const connectDB = () => {
  connect(process.env.DB_URL)
    .then(console.log('DB Connected!'))
    .catch(err => console.log(err))
}
