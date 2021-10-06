const pino = require('pino')

const DEFAULT_LOG_LEVEL = 'info'
const VALID_LOG_LEVELS = [
  'silent',
  'fatal',
  'error',
  'warn',
  'info',
  'debug',
  'trace',
]

module.exports = function (config) {
  const level = VALID_LOG_LEVELS.includes(config.logLevel)
    ? config.logLevel
    : DEFAULT_LOG_LEVEL

  return pino({ level })
}
