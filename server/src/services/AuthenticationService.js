const User = require('../models')

const service = {}

/**
 * @param {string} email
 * @param {string} password
 * Registers a new user
 */
service.register = (email, password) => new Promise(async (resolve, reject) => {
  try {
    const user = await User.create({
      email, password,
    });
    resolve(user)
  } catch (err) {
    reject(err)
  }
})

module.exports = service
