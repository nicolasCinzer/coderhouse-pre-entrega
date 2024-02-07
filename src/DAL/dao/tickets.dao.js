import { ticketsModel } from '../models/tickets.model.js'

export const generateTicket = async ticket => ticketsModel.create(ticket)
