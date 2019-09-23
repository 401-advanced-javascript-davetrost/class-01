const personSchema = {
  firstName: { type: 'string', required: true }, 
  lastName: { type: 'string', required: true },
  married: { type: 'boolean', required: true },
  kids: { type: 'number', required: true },
};

const personModelGood = {
  firstName: 'Chris',
  lastName: 'Sample',
  married: true,
  kids: 3,
};

const personModelBad = {
  firstName: true,
  lastName: 'Sample',
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

module.exports = { personSchema, personModelBad, personModelGood, personModelWithOtherStuff };