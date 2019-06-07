const AuthenticationService = require('./AuthenticationService')
const UserService = require('./UserService')

module.exports = {
  ...AuthenticationService,
  ...UserService,
}
