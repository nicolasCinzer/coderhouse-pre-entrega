import { Router } from 'express'
import { productsService } from '../dao/services/products.service.js'
import { cartsService } from '../dao/services/carts.service.js'

export const router = Router()

router.get('/chat', (req, res) => {
  res.render('chat')
})

router.get('/home', async (req, res) => {
  const { user } = req.session

  if (!user) {
    return res.redirect('/login')
  }

  const { limit, page, sort, query } = req.query

  const products = await productsService.getProducts({ limit, page, sort, query })

  const attributes = {
    products: products.docs
      .map(product => product.toJSON())
      .map(product => ({ ...product, _id: product._id.toString(), category: product.category.replaceAll('|', ' • ') })),
    page: products.page,
    totalPages: products.totalPages,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    user: user.first_name
  }

  products.hasPrevPage ? (attributes['prevPage'] = `http://localhost:8080/home?page=${products.prevPage}`) : null
  products.hasNextPage ? (attributes['nextPage'] = `http://localhost:8080/home?page=${products.nextPage}`) : null

  res.render('home', attributes)
})

router.get('/cart/:cid', async (req, res) => {
  const { cid } = req.params

  const cart = await cartsService.getCartById(cid)

  const products = cart.products
    .map(({ product, quantity }) => ({ ...product.toJSON(), quantity }))
    .map(product => ({
      ...product,
      _id: product._id.toString(),
      category: product.category.replaceAll('|', ' • '),
      price: product.price * product.quantity
    }))

  res.render('cart', {
    products
  })
})

router.get('/login', (req, res) => {
  if (req.session?.user) {
    return res.redirect('/home')
  }

  res.render('login', { baseClass: 'login' })
})

router.get('/signup', (req, res) => {
  if (req.session?.user) {
    return res.redirect('/home')
  }

  res.render('signup', { baseClass: 'singup' })
})

router.get('/profile', (req, res) => {
  const { user } = req.session

  res.render('profile', { user })
})
