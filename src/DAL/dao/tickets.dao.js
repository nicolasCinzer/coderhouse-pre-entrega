import { ticketsModel } from '../models/tickets.model.js'

export const generateTicket = async ticket => {
  try {
    return ticketsModel.create(ticket)
  } catch (err) {
    throw new Error(err)
  }
}
