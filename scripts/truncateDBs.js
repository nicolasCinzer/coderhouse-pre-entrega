import { cartsModel } from '../dao/models/carts.model.js'
import { productsModel } from '../dao/models/products.model.js'
import '../dao/configDB.js'

const populateFields = async () => {
  
}

const args = process.argv.reduce((prev, curr, i, args) => {
  if (curr.includes('--')) {
    const property = curr.split('--')[1]

    prev[property] = args[i + 1]
  }

  return prev
}, {})

const deleteAllCarts = async () => {
  const res = await cartsModel.deleteMany({})

  console.log(`${res.deletedCount} Items Deleted!`)
}

const deleteAllProducts = async () => {
  const res = await productsModel.deleteMany({})

  console.log(`${res.deletedCount} Items Deleted!`)
}

if (args.db === 'carts') {
  console.log('Deleting all Carts Items')

  await deleteAllCarts()

  process.exit()
}

if (args.db === 'products') {
  console.log('Deleting all Products Items')

  await deleteAllProducts()

  process.exit()
}
