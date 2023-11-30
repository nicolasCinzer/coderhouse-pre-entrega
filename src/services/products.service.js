import { productsModel as PM } from '../models/products.model.js'
import { NotFoundError } from '../errors/errors.js'

export const getProducts = async ({ limit = 10, page = 1, sort = 'def', query = {} } = {}) => {
  try {
    const sortOpt = {
      asc: { price: 1 },
      desc: { price: -1 },
      def: { createdAt: -1 }
    }

    const opt = { limit: parseInt(limit), page: parseInt(page), sort: sortOpt[sort] }

    const res = await PM.paginate(query, opt)

    return res
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getProductById = async _id => {
  try {
    const product = await PM.findOne({ _id })

    if (!product) throw new NotFoundError(`Product identified by ID: ${_id} not Found`)

    return product
  } catch (err) {
    throw new Error(err.message)
  }
}

export const addProduct = async product => {
  try {
    const res = await PM.create(product)
    return res
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateProduct = async (id, product) => {
  try {
    const res = await PM.findByIdAndUpdate(id, product)
    return res
  } catch (err) {
    throw new Error(err.message)
  }
}

export const deleteProduct = async id => {
  try {
    const res = await PM.findByIdAndRemove(id)
    return res
  } catch (err) {
    throw new Error(err.message)
  }
}

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
}

// class Product {
//   constructor({ title, description, code, price, status = true, stock, category, thumbnails }) {
//     this.title = title
//     this.description = description
//     this.code = code
//     this.price = price
//     this.status = status
//     this.stock = stock
//     this.category = category
//     this.thumbnails = thumbnails
//   }

//   static create({ title, description, code, price, status = true, stock, category, thumbnails }) {
//     if (!title || typeof title !== 'string') throw new ValidationError('Title type must be a String or Title is missing!')

//     if (!description || typeof description !== 'string') throw new ValidationError('Description type must be a String or Description is missing!')

//     if (!code || typeof code !== 'string') throw new ValidationError('Code type must be a String or Code is missing!')

//     if (!price || typeof price !== 'number') throw new ValidationError('Price type must be a Number or Price is missing!')

//     if (typeof status !== 'boolean') throw new ValidationError('Status type must be a Boolean!')

//     if (!stock || typeof stock !== 'number') throw new ValidationError('Stock type must be a Number or Stock is missing!')

//     if (!category || typeof category !== 'string') throw new ValidationError('Category type must be a String or Category is missing!')

//     if (!Array.isArray(thumbnails) || !thumbnails.every(thumbnail => typeof thumbnail === 'string'))
//       throw new ValidationError('Thumbnails must be an Array of Strings!')

//     return new Product({ title, description, code, price, status, stock, category, thumbnails })
//   }
// }
