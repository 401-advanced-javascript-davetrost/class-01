
class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`expected to cast ${expectedType} and received ${providedValue}`);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {

}

module.exports = {
  CastError,
  ModelError,
};