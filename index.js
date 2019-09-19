const DocumentCollection = require('./lib/document-collection');
const documents = new DocumentCollection('./document-collection');

let jsonObject = { 'name':'Josh', 'age':36, 'hair':true };
documents.save(jsonObject)
  .then(object => {
    console.log('save( object ) =', object);
    return object;
  })
  .catch(err => {
    console.log('caught error:', err);
  });

jsonObject = { 'name':'Joey', 'age':46, 'goofy':true };
documents.save(jsonObject)
  .then(object => {
    console.log('save( object ) =', object);
    return object;
  })
  .then(object => {
    return documents.get(object.id)
      .then(content => {
        console.log('get(', object.id, ') = ', content);
        return content;
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });


documents.getAll()
  .then(content => {
    console.log('readdir() =', content);
  })
  .catch(err => {
    console.log(err);
  });



