const { personSchema, personModelBad, personModelGood, personModelWithOtherStuff } = require('./models/person-models');
const { Model } = require('./lib/model');
const Database = require('./lib/database');


Database.connect('./db')
  .then(() => {
    const People = new Model('person', personSchema);
    People.create(personModelGood)
      .then(created => {
        console.log(created);
      });
    People.create(personModelWithOtherStuff)
      .then(created => {
        console.log(created);
      });
    People.find()
      .then(data => {
        console.log('**************************');
        console.log('ALL DATA IS PRINTED HERE:');
        console.log('**************************');
        console.log(data);
      });
    
  })
  .finally(() => Database.close());




// Database.connect('./db')
//   .then(() => {
//     const People2 = new Model('person', personSchema);
//     People2.create(personModelBad)
//       .then(created => {
//         console.log(created);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .then(() => {
//     const People1 = new Model('person', personSchema);
//     People1.find()
//       .then(alldata => {
//         console.log(alldata);
//       });
//   })
//   .finally(() => Database.close());

