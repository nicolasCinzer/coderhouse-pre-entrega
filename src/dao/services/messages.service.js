import { messagesModel as MM } from '../models/messages.model.js'

class MessagesService {
  async getMessages() {
    const res = await MM.find()
    return res
  }

  async getMessagesByUser(user) {
    try {
      const res = await MM.find({ user })
      return res
    } catch (err) {
      throw new Error(err)
    }
  }

  async addMessage(user, message) {
    try {
      const res = await MM.create({ user, message })
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const messagesService = new MessagesService()
