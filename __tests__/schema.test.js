const Schema = require('../lib/Schema-simple');

describe('schema module performs validation for incoming data', () => {

  const personSchema = new Schema({
    firstName: 'string',
    lastName: 'string',
    married: 'boolean',
    kids: 'number',
  });

  it('passes good model data', () => {
    const personModel = {
      firstName: 'Chris',
      lastName: 'Sample',
      married: true,
      kids: 3,
    };
    const person = personSchema.validate(personModel);
    expect(person).toEqual(personModel);
  });
  
  it('throws an error when bad model data is encountered', () => {
    const personModel = {
      firstName: true,
      lastName: 'Sample',
    };
    const errorToBeThrown = () => personSchema.validate(personModel);
    expect(errorToBeThrown).toThrow('schemaErrors.join is not a function');
  });

  it('ignores extra values in the incoming data', () => {
    const personModel = {
      firstName: 'Chris',
      lastName: 'Sample',
      married: true,
      kids: 3,
    };
    const personModelWithOtherStuff = {
      firstName: 'Chris',
      lastName: 'Sample',
      hair: {
        type: 'wavy',
        color: 'brown',
      },
      favoriteFoods: [
        'pizza',
        'cupcakes',
        'salmon',
      ],
      married: true,
      kids: 3,
      grandkids: 5,
      nieces: 9,
    };

    const person = personSchema.validate(personModelWithOtherStuff);
    expect(person).toEqual(personModel);
  });

});