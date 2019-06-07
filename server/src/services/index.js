module.exports = (io) => {
  // eslint-disable-next-line global-require
  const AuthenticationService = require('./AuthenticationService')
  // eslint-disable-next-line global-require
  const UserService = require('./UserService')
  // eslint-disable-next-line global-require
  const SomeService = require('./SomeService')(io)
  return {
    ...AuthenticationService,
    ...UserService,
    ...SomeService,
  }
}
