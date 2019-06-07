const cron = {}
// initialize websocket cron jobs
cron.init = (io) => {
  io.on('connection', (socket) => {
    console.log('[Event] New client connected.')
    socket.emit('connected', 'Connected to the [Event] stream.')
    socket.on('disconnect', () => console.log('Client disconnected.'))
  })
}

module.exports = cron
