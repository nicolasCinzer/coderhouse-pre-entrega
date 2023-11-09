import { ServerError, ValidationError } from '../../errors/errors.js'
import { usersModel } from '../models/users.model.js'

class UsersService {
  async findById(id) {
    const response = await usersModel.findById(id)

    return response
  }

  async findByEmail(email) {
    const response = await usersModel.findOne({ email })

    return response
  }

  async create(user) {
    const { first_name, last_name, email, password } = user

    if (!first_name || !last_name || !email || !password) {
      throw new ValidationError('Some data is missing!')
    }

    try {
      const response = await usersModel.create(user)

      return response
    } catch (error) {
      throw new ServerError(error)
    }
  }
}

export const userService = new UsersService()
