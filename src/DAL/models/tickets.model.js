import { Schema, model } from 'mongoose'

const ticketsSchema = Schema({
  code: {
    type: String,
    default: Math.random().toString(36).substring(2),
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now()
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
})

export const ticketsModel = model('Tickets', ticketsSchema)
