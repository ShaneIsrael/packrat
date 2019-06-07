const jwt = require('jsonwebtoken')
const authentication = require('../config')

const { register, getUserByEmail } = require('../services')

const controller = {}

/**
 * @param {*} user
 * Creates a jwt signed token of the user data
 */
function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  })
}

/**
 * @param req
 * @param res
 * @param next
 *
 * Controller for handling user log ins
 */
controller.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(403).send({
        error: 'The login information was incorrect',
      })
    }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(403).send({
        error: 'The login information was incorrect',
      })
    }
    const userJson = user.toJSON()
    return res.send({
      user: userJson,
      token: jwtSignUser(userJson),
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * @param req
 * @param res
 * @param next
 *
 * Controller for handling user registration
 */
controller.register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    await register(email, password)
    return res.status(200).send()
  } catch (err) {
    return next(err)
  }
}

module.exports = controller
