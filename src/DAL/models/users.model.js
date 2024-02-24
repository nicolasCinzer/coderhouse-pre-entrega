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
  age: Number,
  password: String,
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
  temp_token: String,
  documents: {
    type: [
      {
        name: String,
        ref: String,
        _id: false
      }
    ],
    default: []
  },
  acceptable_premium: {
    type: Boolean,
    default: false
  },
  last_connection: {
    type: {
      timestamp: {
        type: Date,
        default: Date.now()
      },
      status: {
        type: String,
        enum: ['logged in', 'logged out']
      },
      session_duration: Number
    }
  }
})

export const usersModel = model('Users', usersSchema)
