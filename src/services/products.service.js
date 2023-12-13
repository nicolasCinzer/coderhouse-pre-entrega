import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../dao/products.dao.js'

class ProductsService {
  async getProducts({ limit = 10, page = 1, sort = 'def', query = {} } = {}) {
    try {
      const sortOpt = {
        asc: { price: 1 },
        desc: { price: -1 },
        def: { createdAt: -1 }
      }

      const opt = { limit: parseInt(limit), page: parseInt(page), sort: sortOpt[sort] }

      return getProducts({ opt, query })
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getProductById(id) {
    try {
      return getProductById(id)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async addProduct(product) {
    try {
      return addProduct(product)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async updateProduct({ id, product }) {
    try {
      return updateProduct({ id, product })
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async deleteProduct(id) {
    try {
      return deleteProduct(id)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export const productsService = new ProductsService()
