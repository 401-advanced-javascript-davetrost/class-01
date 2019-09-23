jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

const { readFile, writeFile, readdir } = require('../lib/files');

const docsDir = './document-collection';
const DocumentCollection = require('../lib/document-collection');
const documents = new DocumentCollection(docsDir);

const jsonObject = { 'name':'Dave', 'age':39, 'scooter':null, 'bike':true };
const jsonObjectMayChange = { 'name':'Dave', 'age':39, 'scooter':null, 'bike':true };
const stringObject = JSON.stringify(jsonObject);
const stringObjectParamsOnly = stringObject.slice(1, stringObject.length - 1);

const testId = '123456';
const file1 = 'file1.json';
const file2 = 'file2.json';

describe.skip('Document Collection', () => {
  describe('Save Function', () => {
    it('Saves a file', () => {
      writeFile.mockResolvedValue(true);
      
      return documents.save(jsonObjectMayChange)
        .then(
          object => {
            delete object.id;
            expect(object).toEqual(jsonObject);

            expect(writeFile).toHaveBeenCalledTimes(1);
            expect(writeFile.mock.calls[0][0]).toEqual(expect.stringContaining(docsDir));
            expect(writeFile.mock.calls[0][0]).toEqual(expect.stringContaining('.json'));
            expect(writeFile.mock.calls[0][1]).toEqual(expect.stringContaining(stringObjectParamsOnly));
          }
        );
    });
    it('Propagates an error', () => {
      const saveError = 'save(object) err';
      writeFile.mockRejectedValueOnce(saveError);
      expect.assertions(1);
      
      return documents.save(jsonObjectMayChange)
        .catch(
          err => {
            expect(err).toBe(saveError);
          }
        );
    });
  });


  describe('Get Function', () => {
    it('Gets a file', () => {
      readFile.mockResolvedValue(stringObject);
      
      return documents.get(testId)
        .then(
          object => {
            delete object.id;
            expect(object).toEqual(jsonObject);

            expect(readFile).toHaveBeenCalledTimes(1);
            expect(readFile).toHaveBeenCalledWith(docsDir + '/' + testId + '.json');
          }
        );
    });
    it('Propagates an error', () => {
      const getError = 'get(id) err';
      readFile.mockRejectedValueOnce(getError);
      expect.assertions(1);

      return documents.get(testId)
        .catch(
          err => {
            expect(err).toBe(getError);
          }
        );
    });
  });


  describe('Get All Function', () => {
    it('Gets all files in a directory', () => {
      readdir.mockResolvedValue([file1, file2]);
      readFile.mockClear();
      readFile.mockResolvedValue(stringObject);
      
      return documents.getAll()
        .then(
          content => {
            expect(content[0]).toEqual(jsonObject);
            expect(content[1]).toEqual(jsonObject);

            expect(readdir).toHaveBeenCalledTimes(1);
            expect(readdir).toHaveBeenCalledWith(docsDir);

            expect(readFile).toHaveBeenCalledTimes(2);
            expect(readFile).toHaveBeenCalledWith(docsDir + '/' + file1);
            expect(readFile).toHaveBeenCalledWith(docsDir + '/' + file2);
          }
        );
    });
    it('Propagates an error', () => {
      const getAllError = 'getAll() err';
      readdir.mockRejectedValueOnce(getAllError);
      expect.assertions(1);

      return documents.getAll()
        .catch(
          err => {
            expect(err).toBe(getAllError);
          }
        );
    });
  });



});
