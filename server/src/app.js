const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const http = require('http')
const socketIo = require('socket.io')
const logger = require('./logger')
const { sequelize } = require('./models')
const config = require('./config')

const app = express()

app.use(morgan('combined', { skip(req, res) { return res.statusCode >= 500 }, stream: logger.infoStream }))
app.use(morgan('combined', { skip(req, res) { return res.statusCode < 500 }, stream: logger.errorStream }))
app.use(bodyParser.json())
app.use(cors())

// error handler
app.use((err, req, res, next) => {
  logger.error(err)
  res.status(500).send('Unexpected server error occurred.')
  next()
})

// force: true to drop/reset tables on start

sequelize.sync({force: false})
  .then(() => {
    // app.listen(process.env.PORT || 8081)
    // console.log(`Server started on port ${config.port}`)
  }).catch((err) => {
    logger.error(err)
  })
// app.listen(process.env.PORT || 8080)

// create websocket server
const server = http.createServer(app)
const io = socketIo(server)
require('./cron/DataCron').init(io)
require('./cron/EventCron').init(io)
require('./routes')(app, io)

server.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
