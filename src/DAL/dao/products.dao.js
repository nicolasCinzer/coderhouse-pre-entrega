import { productsModel as PM } from '../models/products.model.js'
import { NotFoundError } from '../../errors/errors.js'

export const getProducts = async query => {
  return PM.find(query)
}

export const getPaginatedProducts = async ({ opt = {}, query = {} }) => {
  return PM.paginate(query, opt)
}

export const getProductById = async _id => {
  const product = await PM.findOne({ _id })

  if (!product) throw new NotFoundError(`Product identified by ID: ${_id} not Found`)

  return product
}

export const addProduct = async product => {
  const newProduct = await PM.create(product)

  return newProduct
}

export const updateProduct = async ({ id, product }) => {
  const updatedProduct = await PM.findByIdAndUpdate(id, product)

  if (!updatedProduct) throw new NotFoundError(`Product identified by ID: ${id} not Found`)

  return updatedProduct
}

export const deleteProduct = async id => {
  const deletedProduct = await PM.findByIdAndRemove(id)

  if (!deletedProduct) throw new NotFoundError(`Product identified by ID: ${id} not Found`)

  return deletedProduct
}

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
}
