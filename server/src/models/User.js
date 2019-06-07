/**
 *  EXAMPLE MODEL USING HOOKS
 */

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  // eslint-disable-next-line consistent-return
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then((hash) => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    hooks: {
      beforeSave: hashPassword,
    },
  })

  // eslint-disable-next-line func-names
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}
