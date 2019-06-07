const controller = {}

/**
 * Some documentation on what is happening
 */
controller.someFunction = async (req, res, next) => {
  try {
    throw new Error('oh shit fuck')
    // return res.send('some data object or message or nothing.')
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
