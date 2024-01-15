import { Router } from 'express'
import { logger } from '../config/logger.js'
import { env } from '../config/config.js'

export const router = Router()

/* Pasar por params el log que quieras testear */
router.get('/loggerTest/:err', (req, res, next) => {
  const { err } = req.params

  const payload = { type: err, success: true, env }

  if (!['fatal', 'error', 'warning', 'info', 'http', 'debug'].includes(err)) {
    return res.json({ ...payload, success: false, message: 'Unrecognized error type. Allowed typos: fatal, error, warning, info, http, debug.' })
  }

  if (err === 'fatal') {
    logger.fatal('Testing fatal log!')
  }

  if (err === 'error') {
    logger.error('Testing error log!')
  }

  if (err === 'warning') {
    logger.warning('Testing warning log!')
  }

  if (err === 'info') {
    logger.info('Testing info log!')
  }

  if (env === 'PRD') return res.json(payload)

  if (err === 'http') {
    logger.http('Testing http log!')
  }

  if (err === 'debug') {
    logger.debug('Testing debug log!')
  }

  res.json(payload)
})
