import { productsService } from '../dao/services/index.services.js'
import { NotFoundError } from '../errors/errors.js'
import { success } from '../utils/index.js'

export const getProducts = async (req, res, next) => {
  const { limit, page, sort, query } = req.query

  try {
    const products = await productsService.getProducts({ limit, page, sort, query })

    const restOfProperties = {
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null,
      nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null
    }

    success({ res, message: `${products.docs.length} Products founded!`, features: products.docs, restOfProperties })
  } catch (err) {
    next(err)
  }
}

export const getProductByID = async (req, res, next) => {
  const { pid } = req.params

  try {
    const product = await productsService.getProductById(pid)

    if (!product) throw new NotFoundError(`Product identified by ID: ${pid} not Found`)

    success({ res, message: 'Product found!', features: product })
  } catch (err) {
    next(err)
  }
}

export const createProduct = async (req, res, next) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body

  try {
    const newProduct = await productsService.addProduct({ title, description, code, price, status, stock, category, thumbnails })

    success({ res, message: 'Product added successfully!', features: newProduct })
  } catch (err) {
    next(err)
  }
}

export const updateProduct = async (req, res, next) => {
  const { pid } = req.params
  const properties = req.body

  try {
    const productUpdated = await productsService.updateProduct(pid, properties)

    if (!productUpdated) throw new NotFoundError(`Product identified by ID: ${pid} not Found`)

    res.success({ res, message: 'Product updated successfully!', features: { ...productUpdated.toJSON(), ...properties } })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  const { pid } = req.params

  try {
    const productDeleted = await productsService.deleteProduct(pid)

    if (!productDeleted) throw new NotFoundError(`Product identified by ID: ${pid} not Found`)

    success({ res, message: 'Product deleted successfully!', features: productDeleted })
  } catch (err) {
    next(err)
  }
}
