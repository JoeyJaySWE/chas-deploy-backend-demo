// Base class for all expeted application errors
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true; // Differ appliction errors from programtic errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 - Validation error, faulty in-data
class ValidationError extends AppError {
  constructor(message = 'Validation Erorr', errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

// 401 - Authorization is required (useable in week 7)
class UnauthorizedError extends AppError {
  constructor(message = 'Authorization is required', errors = []) {
    super(message, 401);
    this.errors = errors;
  }
}

// 403 - Access Denied (usable in week 7)
class ForbiddenError extends AppError {
  constructor(message = 'Access Denied') {
    super(message, 403);
  }
}

// 404 - Not found
class NotFoundError extends AppError {
  constructor(message = 'The resource could not be located') {
    super(message, 404);
  }
}

// 409 - Conflict Error
class ConflictError extends AppError {
  constructor(message = 'The resource is already present') {
    super(message, 409);
  }
}

module.exports = {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
