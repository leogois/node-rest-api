const { readFileSync } = require('fs')
const { join } = require('path')

const { load: loadYaml } = require('js-yaml')

const immutable = Object.freeze

const loadOpenApiJson = () => {
  const openApiPath = join(__dirname, '..', '..', 'docs', 'openapi.yml')
  const openApiFileContent = readFileSync(openApiPath)
  return loadYaml(openApiFileContent)
}

const swagger = immutable({
  document: loadOpenApiJson(),
  options: immutable({
    explorer: false,
  }),
})

const database = immutable({
    client: 'mysql',
    connection: process.env.DB_URL,
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
  swagger,
  encryption,
  jwt,
}
