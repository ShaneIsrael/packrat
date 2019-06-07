module.exports = {
  port: process.env.PORT || 8081,
  db: {
    development: {
      username: 'root',
      password: null,
      database: 'database_development',
      host: '127.0.0.1',
      dialect: 'sqlite',
    },
    test: {
      username: 'root',
      password: null,
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'sqlite',
    },
    production: {
      username: 'root',
      password: null,
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'sqlite',
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
  environment: process.env.GLOBAL_ENVIRONMENT || 'local',
}
