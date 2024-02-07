import { Schema, model, Types } from 'mongoose'

const usersSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  password: {
    type: String
  },
  cart: {
    type: Types.ObjectId,
    ref: 'Carts'
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'premium', 'admin']
  },
  isGithub: {
    type: Boolean,
    default: false
  },
  tempToken: {
    type: String
  }
})

export const usersModel = model('Users', usersSchema)
