const files = require('./files');
const shortid = require('shortid');

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    const id = shortid.generate();
    object.id = id;
    const content = JSON.stringify(object);
    const filename = `${this.folder}/${id}.json`;

    return files.writeFile(filename, content)
      .then(
        () => object,
        err => Promise.reject(err)
      );
  }

  get(id) {
    const filename = `${this.folder}/${id}.json`;
    return files.readFile(filename)
      .then(
        content => JSON.parse(content),
        err => Promise.reject(err)
      );
  }



  getAll() {
    return files.readdir(this.folder)
      .then(
        arr => {
          return Promise.all(arr.map(filename => {
            const id = filename.slice(0, filename.length - '.json'.length);
            return this.get(id);
          }))
            .then(
              arr => arr,
              err => Promise.reject(err)
            );
        },
        err => Promise.reject(err)
      );
  }
}

module.exports = DocumentCollection;