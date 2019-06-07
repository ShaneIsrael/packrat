const { registerPolicy } = require('../policies/')

module.exports = (app, io) => {
  const { register, login, someFunction } = require('../controllers/')(io)
  
  app.post('/register', registerPolicy, register)
  app.post('/login', login)
  app.get('/someRoute', someFunction)

  // app.get('/songs', SongsController.index)
  // app.get('/songs/:songId', SongsController.get)
  // app.post('/songs', SongsController.post)
}
