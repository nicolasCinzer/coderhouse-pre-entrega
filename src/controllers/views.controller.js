import { productsService, cartsService, userService } from '../dao/services/index.services.js'

export const renderChat = (_, res) => {
  res.render('chat')
}

export const renderHome = async (req, res) => {
  const { user: userId } = req.session?.passport || {}

  if (!userId) {
    return res.redirect('/login')
  }

  const user = await userService.findById(userId)

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
}

export const renderCart = async (req, res) => {
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
}

export const renderLogin = (req, res) => {
  if (req.session?.passport) {
    return res.redirect('/home')
  }

  const view = 'login'

  res.render(view, { baseClass: view })
}

export const renderSignup = (req, res) => {
  if (req.session?.passport) {
    return res.redirect('/home')
  }

  const view = 'signup'

  res.render(view, { baseClass: view })
}

export const renderProfile = (req, res) => {
  const { user } = req.session.passport
  const view = 'profile'

  res.render(view, { user, baseClass: view })
}

export const renderResetPasword = (_, res) => {
  const view = 'resetPassword'

  res.render(view)
}

export const renderError = (_, res) => {
  const view = 'error'

  res.render(view)
}
