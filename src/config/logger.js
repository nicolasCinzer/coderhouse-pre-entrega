import { createLogger, transports, format, addColors } from 'winston'
import { env } from './config.js'

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'black',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'gray'
  }
}

export let logger

if (env === 'PRD') {
  logger = createLogger({
    levels: customLevels.levels,
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(format.colorize(), format.simple())
      }),
      new transports.File({
        level: 'error',
        filename: 'logs/error.log',
        format: format.combine(format.timestamp(), format.prettyPrint())
      })
    ]
  })
} else {
  logger = createLogger({
    levels: customLevels.levels,
    transports: [
      new transports.Console({
        level: 'debug'
      })
    ]
  })
}

addColors(customLevels.colors)
