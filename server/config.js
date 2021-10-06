module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  redis: {
    url: process.env.REDIS_URL,
  }
}
