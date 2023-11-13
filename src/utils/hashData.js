import bcrypt from 'bcrypt'

const hashData = data => {
  return bcrypt.hash(data, 10)
}

const compareData = async (data, hashedData) => {
  return bcrypt.compare(data, hashedData)
}

export default {
  hashData,
  compareData
}
