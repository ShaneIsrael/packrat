const AuthenticationController = require('./AuthenticationController')
const SomeOtherController = require('./SomeOtherController')

module.exports = {
  ...AuthenticationController,
  ...SomeOtherController,
}
