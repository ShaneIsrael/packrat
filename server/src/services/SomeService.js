const { Event } = require('../models')

module.exports = (io) => {
  const service = {}

  service.someServiceFunction = () => new Promise((resolve) => {
    io.sockets.emit('data', { category: 'movies', title: 'some movie title' })
    resolve()
  })
  service.someServiceCreateEvent = event => new Promise(async (resolve, reject) => {
    try {
      const { category, group, data } = event
      const e = await Event.create({
        category,
        group,
        dataFields: data,
      })
      io.sockets.emit('data', e)
      resolve(e)
    } catch (err) {
      reject(err)
    }
  })

  return service
}
