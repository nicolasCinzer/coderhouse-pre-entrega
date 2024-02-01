import { productsService } from '../services/products.service.js'
import { createHash, success } from '../utils/index.js'

export const getProducts = async (req, res, next) => {
  let { limit, page, sort, paginated, ...query } = req.query
  paginated = Boolean(parseInt(paginated))

  try {
    const products = await productsService.getProducts({ limit, page, sort, query }, paginated)

    const restOfProperties = paginated
      ? {
          totalPages: products.totalPages,
          prevPage: products.prevPage,
          nextPage: products.nextPage,
          page: products.page,
          hasPrevPage: products.hasPrevPage,
          hasNextPage: products.hasNextPage,
          prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null,
          nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null
        }
      : {}

    const message = `${paginated ? products.docs.length : products.length} Products founded!`

    const features = paginated ? products.docs : products

    success({ res, message, features, restOfProperties })
  } catch (err) {
    next(err)
  }
}

export const getProductByID = async (req, res, next) => {
  const { pid } = req.params

  try {
    const product = await productsService.getProductById(pid)

    success({ res, message: 'Product found!', features: product })
  } catch (err) {
    next(err)
  }
}

export const createProduct = async (req, res, next) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body
  const { email, role } = req.user

  try {
    const newProduct = await productsService.addProduct({
      owner: role === 'admin' ? role : email,
      title,
      description,
      code: code ?? createHash(),
      price,
      status,
      stock,
      category,
      thumbnails
    })

    success({ res, message: 'Product added successfully!', features: newProduct })
  } catch (err) {
    next(err)
  }
}

export const updateProduct = async (req, res, next) => {
  const { pid: id } = req.params
  const product = req.body

  try {
    const updatedProducts = await productsService.updateProduct({ id, product })

    success({ res, message: 'Product updated successfully!', features: { ...updatedProducts.toJSON(), ...product } })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  const { pid } = req.params

  try {
    const deletedProduct = await productsService.deleteProduct(pid)

    success({ res, message: 'Product deleted successfully!', features: deletedProduct })
  } catch (err) {
    next(err)
  }
}

export const mockingProducts = (req, res, next) => {
  const amount = 100

  success({ res, message: `${amount} Products mocked successfully!`, features: productsService.mocking(amount) })
}
