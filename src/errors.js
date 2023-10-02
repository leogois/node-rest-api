class DomainError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class NotFoundError extends DomainError {
  constructor({ resourceName, resourceIdentifier }) {
    super(`Resource ${resourceName} with identifier ${resourceIdentifier} not found.`)
    this.resourceName = resourceName
    this.resourceIdentifier = resourceIdentifier
  }
}

class AuthenticationError extends DomainError {
  constructor(cause = 'not specified') {
    super('The user could not be authenticated')
    this.name = this.constructor.name
    this.cause = cause
  }
}

class AuthorizatioError extends DomainError {
  constructor(cause = 'not specified') {
    super('The user is not authorize')
    this.name = this.constructor.name
    this.cause = cause
  }
}

class ValidationError extends DomainError {
  constructor({ message = 'Invalid parameters', validations }) {
    super(message)
    this.validations = validations
  }
}

class ConflictError extends DomainError {
}

module.exports = {
  NotFoundError,
  ValidationError,
  ConflictError,
  AuthenticationError,
  AuthorizatioError,
}
