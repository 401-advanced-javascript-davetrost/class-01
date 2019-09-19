/* import and use validators */

class Schema {
  /**
   * Create a model schema
   * @param {object} schema - the schema to apply to models
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Run validation on the supplied model 
   * @param {object} model - the model to validate
   * @throws {ModelError} throws if model does not conform to schema
   * @returns {object} - validated data record
   */
  validate(model) {
    const validator = require('./validator');
    const ModelError = require('./Errors').ModelError;

    return Object.entries(this.schema).reduce((validModel, [key, type]) => {
      const modelValue = model[key];
      if(modelValue !== undefined) {
        const Caster = validator.getCaster(type);
        try {
          validModel[key] = Caster(modelValue);
        }
        catch(err) {
          throw new ModelError('this model is not compliant with the schema');
        }
      }
      return validModel;
    }, {});
  }
}

module.exports = Schema;