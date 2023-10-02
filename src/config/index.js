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
  })

  const encryption = immutable ({
    salt: 'salt',
    iterations: 100000,
    keylen: 64,
    digest: 'sha512'
  })

  const jwt = immutable({
    secret: 'Deusjesusfamiliagois1982@',
    expiration: '4h',
    audience: 'urn:api:client',
    issuer: 'urn:api:issuer'
  })

module.exports = {
  database,
  encryption,
  jwt,
}
