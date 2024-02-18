import supertest from 'supertest'
import { server_url } from '../config/config.js'
import { expect } from 'chai'
import { MockingProducts } from '../mocks/products.mock.js'

const requester = supertest(server_url)

const extractResponse = response => {
  const { _body: responseBody, statusCode } = response

  const { payload, message, error } = responseBody

  return { statusCode, responseBody, payload, message, error }
}

describe('Products', function () {
  let endpoint = '/api/products'

  before(async function () {
    this.newProduct = MockingProducts.mockOne()

    const login = await requester.post('/api/auth/login').send({
      email: 'nicolas.cinzer1@gmail.com',
      password: 'sintabu420'
    })

    this.cookie = login.headers['set-cookie'][0].split(';')[0]
  })

  it(`GET ${endpoint} => Should return all products`, async function () {
    const response = await requester.get(endpoint)

    const { statusCode, payload, message } = extractResponse(response)

    expect(payload).to.be.an('array')
    expect(message).to.be.a('string')
    expect(statusCode).to.be.equal(200)
  })

  it(`GET ${endpoint} => Should return a paginated payload`, async function () {
    const response = await requester.get(endpoint).query({ paginated: 1, limit: 5, page: 1 })

    const { payload, message, statusCode, responseBody } = extractResponse(response)

    expect(payload).to.be.an('array')
    expect(message).to.be.a('string')
    expect(statusCode).to.be.equal(200)

    if (responseBody.nextPage) {
      expect(payload).to.have.lengthOf(5)
      expect(responseBody).to.have.property('page').to.equal(1)
    }
  })

  it(`POST ${endpoint} => Should create a product and return it`, async function () {
    const response = await requester.post(endpoint).set('Cookie', this.cookie).send(this.newProduct)

    const { message, payload, statusCode } = extractResponse(response)

    this._idNewProduct = payload._id

    expect(message).to.be.a('string')
    expect(payload).to.includes.all.keys('_id', '__v', 'title', 'status')
    expect(payload.status).to.be.false
    expect(statusCode).to.be.equal(200)
  })

  it(`POST ${endpoint} => Should throw an 401 Unauthorized`, async function () {
    const { statusCode, unauthorized } = await requester.post(endpoint).send(this.newProduct)

    expect(statusCode).to.be.a('number').to.be.equal(401)
    expect(unauthorized).to.be.a('boolean').to.be.true
  })

  it(`GET ${endpoint}/:id => Should return the product identified by the created product id`, async function () {
    const response = await requester.get(`${endpoint}/${this._idNewProduct}`)

    const { message, payload, statusCode } = extractResponse(response)

    expect(message).to.be.a('string')
    expect(payload._id).to.be.equal(this._idNewProduct)
    expect(statusCode).to.be.equal(200)
  })

  it(`GET ${endpoint}/pepino => Should throw an exception by invalid ID`, async function () {
    const response = await requester.get(`${endpoint}/pepino`)

    const { error, statusCode } = extractResponse(response)

    expect(error).to.be.a('string')
    expect(statusCode).to.be.equal(400)
  })

  it(`PUT ${endpoint}/:id => Should throw a 403 because the user is not the owner of the product`, async function () {
    const login = await requester.post('/api/auth/login').send({
      email: 'nicolas.cinzer001@gmail.com',
      password: 'sintabu420'
    })

    const cookie = login.headers['set-cookie'][0].split(';')[0]

    const { statusCode } = await requester.put(`${endpoint}/${this._idNewProduct}`).set('Cookie', cookie).send({ title: 'foo test', stock: 0 })

    expect(statusCode).to.be.a('number').to.be.equal(403)
  })

  it(`PUT ${endpoint}/:id => Should throw an 401 Unauthorized`, async function () {
    const { statusCode, unauthorized } = await requester.put(`${endpoint}/${this._idNewProduct}`).send({ title: 'foo test', stock: 0 })

    expect(statusCode).to.be.a('number').to.be.equal(401)
    expect(unauthorized).to.be.a('boolean').to.be.true
  })

  it(`PUT ${endpoint}/:id => Should return the modified product`, async function () {
    const response = await requester.put(`${endpoint}/${this._idNewProduct}`).set('Cookie', this.cookie).send({ title: 'foo test', stock: 0 })

    const { message, payload, statusCode } = extractResponse(response)

    expect(message).to.be.a('string')
    expect(payload.title).to.not.be.equal(this.newProduct.title)
    expect(statusCode).to.be.equal(200)
  })

  it(`DELETE ${endpoint}/:id => Should throw an 401 Unauthorized`, async function () {
    const { statusCode, unauthorized } = await requester.delete(`${endpoint}/${this._idNewProduct}`)

    expect(statusCode).to.be.a('number').to.be.equal(401)
    expect(unauthorized).to.be.a('boolean').to.be.true
  })

  it(`DELETE ${endpoint}/:id => Should return the modified product`, async function () {
    const response = await requester.delete(`${endpoint}/${this._idNewProduct}`).set('Cookie', this.cookie)

    const { message, statusCode } = extractResponse(response)

    expect(message).to.be.a('string')
    expect(statusCode).to.be.equal(200)
  })

  it(`GET ${endpoint}/:id => Should throw an exception by product not found`, async function () {
    const response = await requester.get(`${endpoint}/${this._idNewProduct}`)

    const { error, statusCode } = extractResponse(response)

    expect(error).to.be.a('string')
    expect(statusCode).to.be.equal(404)
  })
})
