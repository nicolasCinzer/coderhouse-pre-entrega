import { BadRequest, ValidationError } from '../../errors/errors.js'
import { usersModel } from '../models/users.model.js'

export const findById = async id => {
  try {
    const user = await usersModel.findById(id)

    if (!user) throw new ValidationError('User not Found')

    return user
  } catch (error) {
    throw new Error(error)
  }
}

export const findByEmail = async email => {
  try {
    const user = await usersModel.findOne({ email })

    if (!user) throw new ValidationError('User not Found')

    return user
  } catch (error) {
    throw new Error(error)
  }
}

export const create = async user => {
  try {
    return usersModel.create(user)
  } catch (error) {
    throw new Error(error)
  }
}

export const updatePassword = async ({ user, password: newPassword }) => {
  try {
    user.password = newPassword

    return user.save()
  } catch (error) {
    throw new Error(error)
  }
}

export const switchRole = async user => {
  if (user.role === 'user') user.role = 'premium'
  else if (user.role === 'premium') user.role = 'user'
  else if (user.role === 'admin') throw new BadRequest('Cant change role to Admin!')

  try {
    return user.save()
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  findById,
  findByEmail,
  create,
  updatePassword,
  switchRole
}
