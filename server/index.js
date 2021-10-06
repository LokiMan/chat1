const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const config = require('./config')
const Sockets = require('./sockets')
const Logger = require('./logger')

const app = express()

app.enable('trust proxy')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(helmet())

app.use(express.static('client', { fallthrough: true }))

server = Sockets(app, config)
const logger = Logger(config)

server.listen(config.port, async () => {
  logger.info(`Server listening at http://localhost:${config.port}`)
})
