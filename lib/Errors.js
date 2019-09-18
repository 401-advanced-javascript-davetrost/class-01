
class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`make up meaningful message`);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {

}

module.exports = {
  CastError,
  ModelError
};