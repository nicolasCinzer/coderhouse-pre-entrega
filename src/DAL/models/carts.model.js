import { model, Schema, Types } from 'mongoose'

const cartsSchema = Schema({
  products: {
    type: [
      {
        product: {
          type: Types.ObjectId,
          ref: 'Products'
        },
        quantity: {
          type: Number,
          default: 1
        },
        _id: false
      }
    ],
    default: []
  }
})

export const cartsModel = model('Carts', cartsSchema)
