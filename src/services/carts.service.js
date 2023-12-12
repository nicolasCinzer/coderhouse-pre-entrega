import { cartsModel } from '../models/carts.model.js'
import { NotAvailableError, NotFoundError, OutOfStockError } from '../errors/errors.js'

class CartsService {
  async getCartById(_id) {
    try {
      const res = await cartsModel.findOne({ _id }).populate('products.product')

      if (!res) throw new NotFoundError(`Cart identified by ID: '${_id}' not Found`)

      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  async createCart(cart) {
    try {
      const res = await cartsModel.create(cart)

      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  async addProductToCart(_id, product) {
    const pid = product._id

    try {
      const cart = await getCartById(_id)

      const index = cart.products.findIndex(item => item.product.equals(pid))

      index > -1 ? cart.products[index].quantity++ : cart.products.push({ product: pid })

      await product.save()
      return cart.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  async addMultipleProducts(_id, products) {
    try {
      const cart = await getCartById(_id)

      cart.products = products

      return cart.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateQuantity(_id, product = {}, quantity) {
    const pid = product._id

    try {
      const cart = await getCartById(_id)

      const index = cart.products.findIndex(item => item.product.equals(pid))

      if (index === -1) throw new NotAvailableError('This item is not in the Cart!')

      const updatedStock = product.stock - (quantity - cart.products[index].quantity)

      if (updatedStock < 0) throw new OutOfStockError('This item is out of stock! Please submit a lower quantity.')

      cart.products[index].quantity = quantity

      return cart.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteAllProducts(_id) {
    try {
      const cart = await this.getCartById(_id)

      cart.products = []

      return cart.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteCartItem(_id, product = {}) {
    const pid = product._id

    try {
      const cart = await getCartById(_id)

      const index = cart.products.findIndex(item => item.product.equals(pid))

      if (index === -1) throw new NotAvailableError('This item has already been deleted.')

      cart.products = cart.products.filter(item => !item.product.equals(pid))

      return cart.save()
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const cartsService = new CartsService()
