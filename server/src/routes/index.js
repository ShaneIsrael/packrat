const { registerPolicy } = require('../policies/')

module.exports = (app, io) => {
  const { register, login, someFunction, postEvent } = require('../controllers/')(io)

  app.post('/register', registerPolicy, register)
  app.post('/login', login)
  app.post('/api/v1/event', postEvent)
  app.get('/someRoute', someFunction)

  // app.get('/songs', SongsController.index)
  // app.get('/songs/:songId', SongsController.get)
  // app.post('/songs', SongsController.post)
}
