import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  thumbnails: [String],
  owner: {
    type: String,
    default: 'admin'
  }
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = model('Products', productsSchema)
