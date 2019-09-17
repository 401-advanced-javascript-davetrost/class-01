'use strict';

const validator = require('../lib/validator.js');

const str = 'yes';
const num = 1;
const arr = ['a'];
const obj = {x:'y'};
const func = () => {};
const bool = false;

describe('validator module performs basic validation of', () => {

  // TODO: Make this series of tests less repetitive ... DRY it out

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
    const rules = 'string';
    expect(validator.isValid(str, rules)).toBeTruthy();
    expect(validator.isValid(num, rules)).toBeFalsy();
    expect(validator.isValid(arr, rules)).toBeFalsy();
    expect(validator.isValid(obj, rules)).toBeFalsy();
    expect(validator.isValid(func, rules)).toBeFalsy();
    expect(validator.isValid(bool, rules)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
    const rules = 'number';
    expect(validator.isValid(str, rules)).toBeFalsy();
    expect(validator.isValid(num, rules)).toBeTruthy();
    expect(validator.isValid(arr, rules)).toBeFalsy();
    expect(validator.isValid(obj, rules)).toBeFalsy();
    expect(validator.isValid(func, rules)).toBeFalsy();
    expect(validator.isValid(bool, rules)).toBeFalsy();
  });

  it('arrays', () => {
    expect(validator.isArray(str)).toBeFalsy();
    expect(validator.isArray(num)).toBeFalsy();
    expect(validator.isArray(arr)).toBeTruthy();
    expect(validator.isArray(obj)).toBeFalsy();
    expect(validator.isArray(func)).toBeFalsy();
    expect(validator.isArray(bool)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isObject(str)).toBeFalsy();
    expect(validator.isObject(num)).toBeFalsy();
    expect(validator.isObject(arr)).toBeTruthy();
    expect(validator.isObject(obj)).toBeTruthy();
    expect(validator.isObject(func)).toBeFalsy();
    expect(validator.isObject(bool)).toBeFalsy();
  });

  it('booleans', () => {
    expect(validator.isBoolean(str)).toBeFalsy();
    expect(validator.isBoolean(num)).toBeFalsy();
    expect(validator.isBoolean(arr)).toBeFalsy();
    expect(validator.isBoolean(obj)).toBeFalsy();
    expect(validator.isBoolean(func)).toBeFalsy();
    expect(validator.isBoolean(bool)).toBeTruthy();
  });

  it('functions', () => {
    expect(validator.isFunction(str)).toBeFalsy();
    expect(validator.isFunction(num)).toBeFalsy();
    expect(validator.isFunction(arr)).toBeFalsy();
    expect(validator.isFunction(obj)).toBeFalsy();
    expect(validator.isFunction(func)).toBeTruthy();
    expect(validator.isFunction(bool)).toBeFalsy();
  });

});

describe('validator module performs complex validations', () => {

  it.skip('validates the presence of required object properties at any level, and it validates the proper types of object properties', () => {
    // i.e. does person.hair.color exist and have a good value, not just person.hair
    // i.e. person.name must be a string, etc.
    const rules = {
      person: {
        hair: {
          color: 'string',
          length: 'number',
        },
      },
    };
    const input = {
      person: {
        hair: {
          color: 'brown',
          length: 0.2,
        },
      },
    };
    expect(validator.isValid(input, rules)).toBeTruthy();
  });

  it('validates the types of values contained in an array', () => {
    const rules = {
      arrayOf: 'string',
    };
    expect(validator.isValid(['abc', 'def', 'ghi', 'jkl'], rules)).toBeTruthy();
    expect(validator.isValid([], rules)).toBeTruthy();
    expect(validator.isValid(['abc', true, 'ghi', 'jkl'], rules)).toBeFalsy();
    expect(validator.isValid(['abc', 'def', 'ghi', 123], rules)).toBeFalsy();
    expect(validator.isValid([func, 'def', 'ghi', 'jkl'], rules)).toBeFalsy();
  });

  it.skip('validates the types of objects contained in an array of objects', () => {
    const rules = {
      arrayOf: {
        stats: { arrayOf: 'number' },
        name: 'string',
      },
    };
    const arrayOfObjects = [
      {
        stats: [1, 2, 3],
        name: 'dave',
      },
      {
        stats: [4, 5],
        name: str,
      },
      {
        stats: [1.1, 2.2, -3.2],
        name: 'dave' + str,
      },
    ];
    expect(validator.isValid(arrayOfObjects, rules)).toBeTruthy();
  });

  it.skip('validates a value array against an approved list', () => {
    // i.e. a string might only be allowed to be "yes" or "no"
    expect(true).toBeFalsy();
  });

  // TODO: Cover so, so many more cases

});

