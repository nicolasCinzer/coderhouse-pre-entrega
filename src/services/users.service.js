import { findByEmail, findById, create, updateUser, switchRole, find, registrateLastConnection } from '../DAL/dao/users.dao.js'
import { UsersDTO } from '../DAL/dto/users.dto.js'
import { ValidationError, AuthError, NotFoundError } from '../errors/errors.js'
import { hashData, compareData, generateToken, buildURL, resetPasswordEmail } from '../utils/index.js'
import { removeDuplicates } from '../utils/removeDuplicates.js'

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

    const { _id: id } = await findByEmail(email)

    const password = await hashData(newPassword)

    return updateUser({ updates: { password }, id })
  }

  async switchRole(id) {
    const user = await findById(id)

    return UsersDTO.response(await switchRole(user))
  }

  async login({ user }) {
    const { _id, email, first_name, last_connection } = user

    if (!email || !first_name) throw new ValidationError('Some data is missing!')

    const payload = {
      email,
      first_name,
      _id: _id.toString()
    }

    const updatedLastConnection = {
      timestamp: Date.now(),
      status: 'logged in',
      session_duration: 0
    }

    await registrateLastConnection({ user, updatedLastConnection })

    return generateToken(payload)
  }

  async logout({ id }) {
    const user = await findById(id)

    const { last_connection } = user

    const { timestamp } = last_connection

    const updatedLastConnection = {
      timestamp: Date.now(),
      status: 'logged out',
      session_duration: Date.now() - timestamp
    }

    return registrateLastConnection({ user, updatedLastConnection })
  }

  async sendResetPasswordMail(email) {
    const user = await findByEmail(email)

    const token = generateToken({ email })

    user.temp_token = token

    await user.save

    const url = buildURL(`/auth/reset?token=${token}`)

    await resetPasswordEmail({ to: email, url })

    return { url, token }
  }

  async updateDocuments({ files, id }) {
    const newDocuments = Object.keys(files).reduce((docs, file) => {
      const { fieldname: name, path: ref } = files[file][0]

      const document = {
        name,
        ref
      }

      docs.push(document)

      return docs
    }, [])

    const { documents: docs } = await findById(id)

    const documents = removeDuplicates([...docs, ...newDocuments], 'name')

    const updatedUser = await updateUser({ updates: { documents }, id })

    updatedUser.acceptable_premium = updatedUser.documents.filter(doc => ['id', 'bank', 'address'].includes(doc.name)).length === 3

    return updatedUser.save()
  }
}

export const usersService = new UsersService()
