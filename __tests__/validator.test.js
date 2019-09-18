'use strict';

const validator = require('../lib/validator');
const {CastError, ModelError} = require('../lib/Errors');

describe.skip('validator module provides type casting lookup of', () => {
  it('strings', () => expect(validator.getCaster('string')).toBe(validator.castString));
  it('numbers', () => expect(validator.getCaster('number')).toBe(validator.castNumber));
  it('boolean', () => expect(validator.getCaster('boolean')).toBe(validator.castBoolean));
  it('date', () => expect(validator.getCaster('date')).toBe(validator.castDate));
  it('array', () => expect(validator.getCaster('array')).toBe(validator.castArray));
});

const str = 'yes';
const emptyStr = '';
const number = 42;
const bool = true;
const obj = {};
const date = new Date();

describe('validator module performs type casting of', () => {
  const Caster = validator.getCaster('string');
  it('String from str', () => expect(Caster(str)).toBe(str));
  it('String from emptyStr', () => expect(Caster(emptyStr)).toBe(emptyStr));
  it.skip('String from number', () => expect(Caster(number)).toBe(`${number}`));
  it.skip('String from bool', () => expect(Caster(bool)).toThrow(CastError));
  it.skip('String from obj', () => expect(Caster(obj)).toThrow(CastError));
  it.skip('String from date', () => expect(Caster(date)).toThrow(CastError));
});

describe.skip('validator module performs basic validation of', () => {
  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = {x:'y'};
  const func = () => {};
  const bool = false;

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
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

describe.skip('validator module performs array validation of', () => {

  const arrayOfStrings = ['a', 'b', 'c'];
  const arrayOfNumbers = [1, 2, 3];
  const arrayOfObjects = [{}, {}, {}];
  const arrayOfBooleans = [true, false, true];

  it('strings', () => {
    expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
    expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
    expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
    expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
  });

  it('numbers', () => {

  });

  it('objects', () => {
  
  });

  it('booleans', () => {
  
  });
});

describe.skip('validator module gets validator for', () => {

  it('strings', () => {
    // TODO: pass getValidator the rules
    expect(validator.getValidator(/* rules */)).toBe(validator.isString);
  });
  
  it('numbers', () => {
    
  });

  it('arrays', () => {
    
  });

  it('objects', () => {
    
  });

  it('booleans', () => {
    
  });

  it('functions', () => {
    
  });

  it('array of strings', () => {
    
  });

  it('array of numbers', () => {
    
  });

  it('array of objects', () => {
    
  });

  it('array of booleans', () => {
    
  });

});