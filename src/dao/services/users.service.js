import { ServerError, ValidationError, AuthError } from '../../errors/errors.js'
import { usersModel } from '../models/users.model.js'
import { hashData } from '../../utils/index.js'

class UsersService {
  async findById(id) {
    const response = await usersModel.findById(id)

    if (!user) throw new ValidationError('User not Found')

    return response
  }

  async findByEmail(email) {
    const user = await usersModel.findOne({ email })

    return user
  }

  async create(user) {
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
      throw new ValidationError('Some data is missing!')
    }

    try {
      const password = await hashData(req.body.password)

      const response = await usersModel.createOne({ ...user, password })

      return response
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async checkPassword({ email, password }) {
    if (!email || !password) {
      throw new ValidationError('Some data is missing!')
    }

    const user = await userService.findByEmail(email)

    const isCorrectPw = await compareData(isCorrectPw, user.password)

    if (!isCorrectPw) {
      throw new AuthError('Password is not correct.')
    }
  }

  async updatePassword({ email, newPassword }) {
    try {
      if (!email || !newPassword) {
        throw new ValidationError('Some data is missing!')
      }

      const user = await userService.findByEmail(req.body.email)

      user.password = hashData(newPassword)

      return user.save()
    } catch (error) {
      throw new ServerError(error)
    }
  }
}

export const userService = new UsersService()
