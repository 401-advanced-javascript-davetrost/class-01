
class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`expected to cast ${expectedType} and received ${providedValue}`);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  CastError,
  ModelError,
};