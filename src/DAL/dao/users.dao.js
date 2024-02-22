import { BadRequest, ValidationError } from '../../errors/errors.js'
import { usersModel } from '../models/users.model.js'

export const findById = async id => {
  const user = await usersModel.findById(id)

  if (!user) throw new ValidationError('User not Found')

  return user
}

export const findByEmail = async email => {
  const user = await usersModel.findOne({ email })

  if (!user) throw new ValidationError('User not Found')

  return user
}

export const find = async query => {
  const user = await usersModel.findOne(query)

  if (!user) throw new ValidationError('User not Found')

  return user
}

export const create = async user => usersModel.create(user)

export const updatePassword = async ({ user, password: newPassword }) => {
  user.password = newPassword

  return user.save()
}

export const switchRole = async user => {
  if (user.role === 'user') user.role = 'premium'
  else if (user.role === 'premium') user.role = 'user'
  else if (user.role === 'admin') throw new BadRequest('Cant change role to Admin!')

  return user.save()
}

export const registrateLastConnection = async ({ user, updatedLastConnection }) => {
  user.last_connection = updatedLastConnection

  await user.save()
}
