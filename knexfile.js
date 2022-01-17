// Update with your config settings.
require('dotenv/config')
module.exports = {
  development: {
    client: 'postgresql', //'sqlite3',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      //filename: './dev.sqlite3'
    },
    migrations: {
      directory: './src/database/migrations',
      //tableName: 'knex_migrations'
    }
  },
  
  test: {
    client: 'sqlite3',
    connection: {
      host: '',
      database: '',
      user: '',
      password: '',
      //filename: './dev.sqlite3'
    },
    migrations: {
      directory: './src/database/migrations',
      //tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: '',
      user: '',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations',
      //tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations',
      //tableName: 'knex_migrations'
    }
  }
};
