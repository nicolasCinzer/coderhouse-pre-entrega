import { getCartById, createCart, addProductToCart, updateQuantity, deleteAllProducts, deleteCartItem } from '../DAL/dao/carts.dao.js'
import { generateTicket } from '../DAL/dao/tickets.dao.js'
import { createHash, sendTicketMail, checkValidOID } from '../utils/index.js'
import { productsService } from './products.service.js'

class CartsService {
  async getCartById(id) {
    checkValidOID(id)

    try {
      return getCartById(id, true)
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
    checkValidOID(cid, pid)

    try {
      const cart = await getCartById(cid)

      return addProductToCart({ cart, pid })
    } catch (err) {
      throw new Error(err)
    }
  }

  async addMultipleProducts({ cid, products }) {
    checkValidOID(cid)

    try {
      const cart = await getCartById(cid)

      products.forEach(async pid => {
        const index = cart.products.findIndex(({ product }) => product.equals(pid))

        index > -1 ? cart.products[index].quantity++ : cart.products.push({ product: pid })
      })

      return cart.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateQuantity({ cid, pid, quantity }) {
    checkValidOID(cid, pid)

    try {
      const cart = await getCartById(cid)

      return updateQuantity({ cart, pid, quantity })
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteAllProducts(id) {
    checkValidOID(id)

    try {
      const cart = await getCartById(id)

      return deleteAllProducts(cart)
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteCartItem({ cid, pid }) {
    checkValidOID(cid, pid)

    try {
      const cart = await getCartById(cid)

      return deleteCartItem({ cart, pid })
    } catch (err) {
      throw new Error(err)
    }
  }

  async purchaseItems({ cid, email }) {
    checkValidOID(cid)

    try {
      const cart = await getCartById(cid, true)

      const products = cart.products.map(({ product, quantity }) => ({
        ...product.toJSON(),
        quantity,
        total: product.price * quantity,
        updatedQuantity: product.stock - quantity
      }))

      //Update Stock
      products.forEach(async ({ _id: id, updatedQuantity }) => {
        if (updatedQuantity < 0) return

        const product = { stock: updatedQuantity }

        await productsService.updateProduct({ id, product })
      })

      const nonStockedProducts = products.filter(({ updatedQuantity }) => updatedQuantity < 0).map(({ _id }) => _id)

      const productsPurchased = products.filter(({ updatedQuantity }) => updatedQuantity >= 0)

      const ticket = {
        amount: productsPurchased.reduce((prev, curr) => prev + curr.total, 0),
        purchaser: email,
        code: createHash()
      }

      const generatedTicket = await generateTicket(ticket)

      cart.products = cart.products.filter(({ product }) => !productsPurchased.map(({ _id }) => _id.toString()).includes(product._id.toString()))

      cart.save()

      await sendTicketMail({ to: email, ticketCode: generatedTicket.code, totalCost: ticket.amount, totalItems: productsPurchased.length })

      return { ticket: generatedTicket, nonStockedProducts }
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const cartsService = new CartsService()
