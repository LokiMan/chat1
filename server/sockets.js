const http = require('http')
const { Server } = require('socket.io')
const Messages = require('./messages')

module.exports = (app, config) => {
  const server = http.createServer(app)
  const io = new Server(server)

  const userList = new Set()
  const messages = Messages(config)

  io.on('connection', async (socket) => {
    if (!'auth' in socket.handshake) {
      return
    }

    const { name } = socket.handshake.auth

    userList.add(name)

    socket.on('message', (text) => {
      const preparedText = text.trim()

      if (preparedText.length === 0) {
        return
      }

      const message = `${name}: ${preparedText}`

      io.emit('message', message)

      messages.add(message)
    })

    socket.on('disconnect', () => {
      userList.delete(name)

      socket.broadcast.emit('leave', name)
    });

    const allMessages = await messages.getAll()

    socket.emit('init', Array.from(userList), allMessages)

    socket.broadcast.emit('enter', name)
  })

  return server
}
