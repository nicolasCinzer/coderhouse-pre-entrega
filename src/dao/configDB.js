import { connect } from 'mongoose'

const URI = `mongodb+srv://nicolascinzer00:niJ80qDPNmaUlyLS@ecommerce.syps22c.mongodb.net/eCommerce?retryWrites=true&w=majority`

connect(URI)
  .then(console.log('DB Connected!'))
  .catch(err => console.log(err))
