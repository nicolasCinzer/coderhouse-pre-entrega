import { logger } from '../config/logger.js'

export const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err

  if (statusCode) {
    logger.error(message)
    res.status(statusCode).json({ error: message })
  } else {
    logger.fatal(message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default errorHandler
