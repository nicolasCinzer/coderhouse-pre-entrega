import bcrypt from 'bcrypt'

export const hashData = data => {
  return bcrypt.hash(data, 10)
}

export const compareData = async (data, hashedData) => {
  return bcrypt.compare(data, hashedData)
}
