jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

const { readFile, writeFile, readdir } = require('../lib/files');

const DocumentCollection = require('../lib/document-collection');
const documents = new DocumentCollection('./document-collection');

const jsonObject = { 'name':'Dave', 'age':39, 'scooter':null, 'bike':true };
const stringObject = JSON.stringify(jsonObject);
const stringObjectParamsOnly = stringObject.slice(1, stringObject.length - 1);

describe('Document Collection', () => {
  describe('Save Function', () => {
    it('Saves a file', () => {
      writeFile.mockResolvedValue(true);
      
      return documents.save(jsonObject)
        .then(
          object => {
            delete object.id;
            expect(object).toEqual(jsonObject);

            expect(writeFile).toHaveBeenCalledTimes(1);
            expect(writeFile.mock.calls[0][0]).toEqual(expect.stringContaining('./document-collection/'));
            expect(writeFile.mock.calls[0][0]).toEqual(expect.stringContaining('.json'));
            expect(writeFile.mock.calls[0][1]).toEqual(expect.stringContaining(stringObjectParamsOnly));
          }
        );
    });
    it('Propagates an error', () => {
      const saveError = 'save(object) err';
      writeFile.mockRejectedValueOnce(saveError);
      expect.assertions(1);
      
      return documents.save(jsonObject)
        .catch(
          err => {
            expect(err).toBe(saveError);
          }
        );
    });
  });


  describe.skip('Get Function', () => {
    it('Gets a file', () => {
      readFile.mockResolvedValue(stringObject);
      
      return documents.get('1234')
        .then(
          object => {
            delete object.id;
            expect(object).toEqual(jsonObject);

            expect(readFile).toHaveBeenCalledTimes(1);
            expect(readFile).toHaveBeenCalledWith(jsonObject.id + '.json');
          }
        );
    });
    it.skip('Propagates an error', () => {
      const saveError = 'save(object) err';
      writeFile.mockRejectedValueOnce(saveError);
      expect.assertions(1);

      return documents.save(jsonObject)
        .catch(
          err => {
            expect(err).toBe(saveError);
          }
        );
    });
  });



});
