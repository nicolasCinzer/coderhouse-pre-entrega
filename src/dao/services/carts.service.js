import { cartsModel as CM } from '../models/carts.model.js'
import { NotAvailableError, ServerError, ValidationError, NotFoundError, OutOfStockError } from '../../errors/errors.js'
import { Types } from 'mongoose'

class CartsService {
  async getCartById(_id) {
    try {
      const res = await CM.findOne({ _id }).populate('products.product')

      if (!res) throw new NotFoundError(`Cart identified by ID: '${_id}' not Found`)

      return res
    } catch (err) {
      throw new ServerError(err)
    }
  }

  async createCart(cart) {
    const item = Cart.create(cart)

    try {
      const res = await CM.create(item)

      return res
    } catch (err) {
      throw new ServerError(err)
    }
  }

  async addProduct(_id, product) {
    const pid = product._id

    try {
      const cart = await this.getCartById(_id)

      const index = cart.products.findIndex(item => item.product.equals(pid))

      index > -1 ? cart.products[index].quantity++ : cart.products.push({ product: pid })

      await product.save()
      return cart.save()
    } catch (err) {
      throw new ServerError(err)
    }
  }

  async addMultipleProducts(_id, products) {
    try {
      const cart = await this.getCartById(_id)

      Cart.create({ products })

      cart.products = products

      return cart.save()
    } catch (err) {
      throw new ServerError(err)
    }
  }

  async updateQuantity(_id, product = {}, quantity) {
    const pid = product._id

    try {
      const cart = await this.getCartById(_id)

      const index = cart.products.findIndex(item => item.product.equals(pid))

      if (index === -1) throw new NotAvailableError('This item is not in the Cart!')

      const updatedStock = product.stock - (quantity - cart.products[index].quantity)

      if (updatedStock < 0) throw new OutOfStockError('This item is out of stock! Please submit a lower quantity.')

      cart.products[index].quantity = quantity

      return cart.save()
    } catch (err) {
      throw new ServerError(err)
    }
  }

  async deleteAllProducts(_id) {
    try {
      const cart = await this.getCartById(_id)

      cart.products = []

      return cart.save()
    } catch (err) {
      throw new ServerError(err)
    }
  }

  async deleteCartItem(_id, product = {}) {
    const pid = product._id

    try {
      const cart = await this.getCartById(_id)

      const index = cart.products.findIndex(item => item.product.equals(pid))

      if (index === -1) throw new NotAvailableError('This item has already been deleted.')

      cart.products = cart.products.filter(item => !item.product.equals(pid))

      return cart.save()
    } catch (err) {
      throw new ServerError(err)
    }
  }
}

class Cart {
  constructor({ products }) {
    this.products = products
  }

  static create({ products }) {
    if (!Array.isArray(products) || !products.every(product => CartItem.create(product) instanceof CartItem))
      throw new ValidationError('Products must be an Array of CartItem Type!')

    return new Cart({ products: products.map(product => CartItem.create(product)) })
  }

  setId(id) {
    this.id = id
  }
}

class CartItem {
  constructor({ product, qty }) {
    this.product = product
    this.qty = qty
  }

  static create({ product, qty = 1 }) {
    if (product instanceof Types.ObjectId || typeof product !== 'string') throw new ValidationError('Product ID must be a String or ObjectId!')

    return new CartItem({ product, qty })
  }
}

export const cartsService = new CartsService()
