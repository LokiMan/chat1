const redis = require('redis')
const { promisify } = require('util')

const LIST = 'messages'
const MAX_COUNT = 10

module.exports = (config) => {
  const client = redis.createClient(config.redis.url)

  const rPushAsync = promisify(client.rpush).bind(client)
  const lTrimAsync = promisify(client.ltrim).bind(client)
  const lRangeAsync = promisify(client.lrange).bind(client)

  return {
    async add(message) {
      await rPushAsync(LIST, message)
      await lTrimAsync(LIST, -MAX_COUNT, -1)
    },

    getAll() {
      return lRangeAsync(LIST, 0, -1)
    },
  }
}
