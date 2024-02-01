class BaseError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(404, message)
  }
}

class NotAvailableError extends BaseError {
  constructor(message = 'Not Available') {
    super(404, message)
  }
}

class OutOfStockError extends BaseError {
  constructor(message = 'Out of stock') {
    super(400, message)
  }
}

class ValidationError extends BaseError {
  constructor(message = 'Validation failed.') {
    super(400, message)
  }
}

class NotAllowedError extends BaseError {
  constructor(message = 'You are not allowed to perform this action.') {
    super(403, message)
  }
}

class BadRequest extends BaseError {
  constructor(message = 'Something is bad with the request.') {
    super(400, message)
  }
}

class ConflictError extends BaseError {
  constructor(message = 'Conflict detected.') {
    super(409, message)
  }
}

class AuthError extends BaseError {
  constructor(message = 'Authentication failed.') {
    super(401, message)
  }
}

export { NotFoundError, NotAvailableError, NotAllowedError, BadRequest, ValidationError, ConflictError, OutOfStockError, AuthError }
