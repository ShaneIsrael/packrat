
module.exports = (io) => {
  // eslint-disable-next-line global-require
  const { someServiceFunction, someServiceCreateEvent } = require('../services')(io)

  const controller = {}
  /**
   * Some documentation on what is happening
   */
  controller.someFunction = async (req, res, next) => {
    try {
      await someServiceFunction()
      return res.send('some data object or message or nothing.')
    } catch (err) {
      return next(err)
    }
  }

  controller.postEvent = async (req, res, next) => {
    try {
      const event = await someServiceCreateEvent(req.body)
      return res.status(200).send(event)
    } catch (err) {
      return next(err)
    }
  }

  return controller
}
