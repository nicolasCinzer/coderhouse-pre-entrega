import { productsModel as PM } from '../models/products.model.js'
import { NotFoundError } from '../errors/errors.js'

export const getProducts = async ({ opt = {}, query = {} }) => {
  try {
    return PM.paginate(query, opt)
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
    const newProduct = await PM.create(product)

    return newProduct
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateProduct = async ({ id, product }) => {
  try {
    const updatedProduct = await PM.findByIdAndUpdate(id, product)

    if (!updatedProduct) throw new NotFoundError(`Product identified by ID: ${_id} not Found`)

    return updatedProduct
  } catch (err) {
    throw new Error(err.message)
  }
}

export const deleteProduct = async id => {
  try {
    const deletedProduct = await PM.findByIdAndRemove(id)

    if (!deletedProduct) throw new NotFoundError(`Product identified by ID: ${_id} not Found`)

    return deletedProduct
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
