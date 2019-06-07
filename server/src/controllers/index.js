module.exports = io => {
  const AuthenticationController = require('./AuthenticationController')
  const SomeOtherController = require('./SomeOtherController')(io)
  return {
    ...AuthenticationController,
    ...SomeOtherController,
  }
}
