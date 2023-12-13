import {
  getCartById,
  createCart,
  addProductToCart,
  addMultipleProducts,
  updateQuantity,
  deleteAllProducts,
  deleteCartItem
} from '../dao/carts.dao.js'
import { productsService } from './products.service.js'

class CartsService {
  async getCartById(id) {
    try {
      return getCartById(id)
    } catch (err) {
      throw new Error(err)
    }
  }

  async createCart() {
    try {
      return createCart()
    } catch (err) {
      throw new Error(err)
    }
  }

  async addProductToCart({ cid, pid }) {
    try {
      const cart = await getCartById(cid)

      return addProductToCart({ cart, pid })
    } catch (err) {
      throw new Error(err)
    }
  }

  async addMultipleProducts({ cid, products }) {
    try {
      const cart = await getCartById(cid)

      return addMultipleProducts({ cart, products })
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateQuantity({ cid, pid, quantity }) {
    try {
      const cart = await getCartById(cid)

      return updateQuantity({ cart, pid, stock, quantity })
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteAllProducts(id) {
    try {
      const cart = await getCartById(id)

      return deleteAllProducts(cart)
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteCartItem({ cid, pid }) {
    try {
      const cart = await getCartById(cid)

      return deleteCartItem({ cart, pid })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const cartsService = new CartsService()
