import { ValidationError, AuthError, NotFoundError } from '../errors/errors.js'
import { usersModel } from '../models/users.model.js'
import { hashData, compareData } from '../utils/index.js'

export const findById = async id => {
  const user = await usersModel.findById(id)

  if (!user) throw new ValidationError('User not Found')

  return user
}

export const findByEmail = async email => {
  const user = await usersModel.findOne({ email })

  return user
}

export const create = async user => {
  if (!user.first_name || !user.last_name || !user.email || !user.password) {
    throw new ValidationError('Some data is missing!')
  }

  try {
    const password = await hashData(user.password)

    const newUser = await usersModel.create({ ...user, password })

    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

export const createFromGithub = async user => {
  if (!user.isGithub) throw new ValidationError('This user is not from Github')

  if (!user.first_name || !user.last_name || !user.email) throw new ValidationError('Some data is missing!')

  try {
    const newUser = await usersModel.create(user)

    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

export const checkPassword = async ({ email, password }) => {
  if (!email || !password) throw new ValidationError('Some data is missing!')

  const user = await findByEmail(email)

  if (!user) throw new NotFoundError(`User identified by email: ${email} not found!`)

  const isCorrectPw = await compareData(password, user.password)

  if (!isCorrectPw) throw new AuthError('Password is not correct.')

  return user
}

export const updatePassword = async ({ email, password: newPassword }) => {
  try {
    if (!email || !newPassword) {
      throw new ValidationError('Some data is missing!')
    }

    const user = await findByEmail(email)

    user.password = await hashData(newPassword)

    return user.save()
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  findById,
  findByEmail,
  create,
  createFromGithub,
  checkPassword,
  updatePassword
}
