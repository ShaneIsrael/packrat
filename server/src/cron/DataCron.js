const cron = {}
// initialize websocket cron jobs
cron.init = (io) => {
  io.on('connection', (socket) => {
    console.log('[Data] New client connected.')
    socket.emit('connected', 'Connected to the [Data] stream.')
    socket.on('disconnect', () => console.log('Client disconnected.'))
  })
}

module.exports = cron
