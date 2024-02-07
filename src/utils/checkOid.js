import { isValidObjectId } from 'mongoose'
import { BadRequest } from '../errors/errors.js'

export const checkValidOID = (...ids) => {
  const invalidIds = ids.filter(id => isValidObjectId(id))

  if (invalidIds.length) throw new BadRequest(`Invalid IDs provided: '${invalidIds.join(' ,')}'.`)
}
