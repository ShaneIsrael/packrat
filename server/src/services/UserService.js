const User = require('../models')

const service = {}

/**
 * @param {string} email
 * Gets a user by email
 */
service.getUserByEmail = email => new Promise(async (resolve, reject) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    resolve(user)
  } catch (err) {
    reject(err)
  }
})

module.exports = service
