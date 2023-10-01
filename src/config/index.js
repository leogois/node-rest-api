const immutable = Object.freeze

const database = immutable({

    client: 'pg',
    version: '15.3',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'magno1982',
      database: 'users',
    },
    migrations: immutable({
      tableName: 'migrations',
    }),
  },
)

module.exports = {
  database,
}
