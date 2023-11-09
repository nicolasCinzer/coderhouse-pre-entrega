import 'dotenv/config'

export default `mongodb+srv:/${process.env.DB_USERNAME}:${process.env.DB_PW}@ecommerce.syps22c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
