import { model, Schema } from 'mongoose'

const messagesSchema = Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

export const messagesModel = model('Messages', messagesSchema)
