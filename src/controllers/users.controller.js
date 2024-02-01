import { usersService } from '../services/users.service.js'
import { success } from '../utils/index.js'

export const switchRole = async (req, res, next) => {
  const { uid } = req.params

  try {
    const user = await usersService.switchRole(uid)

    success({ res, message: 'User role changed successfully!', features: [user] })
  } catch (error) {
    next(error)
  }
}
