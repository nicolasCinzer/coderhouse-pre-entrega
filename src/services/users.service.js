import { findByEmail, findById, create } from '../DAL/dao/users.dao.js'
import { ValidationError, AuthError, NotFoundError } from '../errors/errors.js'
import { hashData, compareData, generateToken } from '../utils/index.js'

class UsersService {
  async findById(id) {
    return findById(id)
  }

  async findByEmail(email) {
    return findByEmail(email)
  }

  async create(user) {
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
      throw new ValidationError('Some data is missing!')
    }

    try {
      const password = await hashData(user.password)

      const newUser = await create({ ...user, password })

      return newUser
    } catch (error) {
      throw new Error(error)
    }
  }

  async createFromGithub(user) {
    if (!user.isGithub) throw new ValidationError('This user is not from Github')

    if (!user.first_name || !user.last_name || !user.email) throw new ValidationError('Some data is missing!')

    try {
      const newUser = await usersModel.create(user)

      return newUser
    } catch (error) {
      throw new Error(error)
    }
  }

  async checkPassword({ email, password }) {
    if (!email || !password) throw new ValidationError('Some data is missing!')

    const user = await findByEmail(email)

    if (!user) throw new NotFoundError(`User identified by email: ${email} not found!`)

    const isCorrectPw = await compareData(password, user.password)

    if (!isCorrectPw) throw new AuthError('Password is not correct.')

    return user
  }

  async updatePassword({ email, password: newPassword }) {
    try {
      if (!email || !newPassword) {
        throw new ValidationError('Some data is missing!')
      }

      const user = await findByEmail(email)

      const password = await hashData(newPassword)

      return updatePassword({ password, user })
    } catch (error) {
      throw new Error(error)
    }
  }
  
  async login({ email, first_name }) {
    const payload = {
      email,
      first_name
    }

    return generateToken(payload)
  }
}

export const usersService = new UsersService()
