import { findByEmail, findById, create, updatePassword, switchRole, find } from '../DAL/dao/users.dao.js'
import { UsersDTO } from '../DAL/dto/users.dto.js'
import { ValidationError, AuthError, NotFoundError } from '../errors/errors.js'
import { hashData, compareData, generateToken, buildURL, resetPasswordEmail } from '../utils/index.js'

class UsersService {
  async findById(id) {
    return findById(id)
  }

  async find(query) {
    return find(query)
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
    if (!email || !newPassword) {
      throw new ValidationError('Some data is missing!')
    }

    const user = await findByEmail(email)

    const password = await hashData(newPassword)

    return updatePassword({ password, user })
  }

  async switchRole(id) {
    const user = await findById(id)

    return UsersDTO.response(await switchRole(user))
  }

  async login({ email, first_name }) {
    const payload = {
      email,
      first_name
    }

    return generateToken(payload)
  }

  async sendResetPasswordMail(email) {
    const user = await findByEmail(email)

    const token = generateToken({ email })

    user.tempToken = token

    await user.save

    const url = buildURL(`/auth/reset?token=${token}`)

    await resetPasswordEmail({ to: email, url })

    return { url, token }
  }
}

export const usersService = new UsersService()
