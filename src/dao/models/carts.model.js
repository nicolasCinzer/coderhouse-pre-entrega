import { model, Schema, Types } from 'mongoose'

const cartsSchema = Schema({
  products: [
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
  ]
})

export const cartsModel = model('Carts', cartsSchema)
