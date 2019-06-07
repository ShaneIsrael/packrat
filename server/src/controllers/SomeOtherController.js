module.exports = (io) => {
  // eslint-disable-next-line global-require
  const { someServiceFunction } = require('../services')(io)

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

  return controller
}
