import { messagesModel } from '../models/messages.model.js'

export const getMessages = async () => {
  const res = await messagesModel.find()
  return res
}

export const getMessagesByUser = async user => {
  try {
    const res = await messagesModel.find({ user })
    return res
  } catch (err) {
    throw new Error(err)
  }
}

export const addMessage = async (user, message) => {
  try {
    const res = await messagesModel.create({ user, message })
    return res
  } catch (err) {
    throw new Error(err)
  }
}

export default {
  getMessages,
  getMessagesByUser,
  addMessage
}
