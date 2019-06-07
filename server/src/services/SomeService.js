
module.exports = (io) => {
  const service = {}

  service.someServiceFunction = () => new Promise((resolve) => {
    io.sockets.emit('data', { category: 'movies', title: 'some movie title' })
    resolve()
  })
  return service
}
