'use strict';

const validator = require('../lib/validator');
const CastError = require('../lib/Errors').CastError;

const randomStr = 'yes';
const trueStr = 'true';
const numStr = '123';
const negNumStr = '-0.123';
const emptyStr = '';
const number = 42;
const zeroNumber = 0;
const oneNumber = 1;
const bool = true;
const obj = {};
const date = new Date();
const dateStr1 = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
const dateStr2 = date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' });
const dateStr3 = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

describe('validator module performs type casting of', () => {
  describe('Strings', () => {
    const Caster = validator.getCaster('string');
    it('from randomStr', () => {
      expect(Caster(randomStr)).toBe(randomStr);
    });
    it('from trueStr', () => {
      expect(Caster(trueStr)).toBe(trueStr);
    });
    it('from numStr', () => {
      expect(Caster(numStr)).toBe(numStr);
    });
    it('from negNumStr', () => {
      expect(Caster(negNumStr)).toBe(negNumStr);
    });
    it('from emptyStr', () => {
      expect(Caster(emptyStr)).toBe(emptyStr);
    });
    it('from number', () => {
      expect(Caster(number)).toBe(`${number}`);
    });
    it('from zeroNumber', () => {
      expect(Caster(zeroNumber)).toBe(`${zeroNumber}`);
    });
    it('from oneNumber', () => {
      expect(Caster(oneNumber)).toBe(`${oneNumber}`);
    });
    it('from bool', () => {
      expect(() => Caster(bool)).toThrow(CastError);
    });
    it('from obj', () => {
      expect(() => Caster(obj)).toThrow(CastError);
    });
    it('from date', () => {
      expect(() => Caster(date)).toThrow(CastError);
    });
  });
  describe('Numbers', () => {
    const Caster = validator.getCaster('number');
    it('from randomStr', () => {
      expect(() => Caster(randomStr)).toThrow(CastError);
    });
    it('from trueStr', () => {
      expect(() => Caster(trueStr)).toThrow(CastError);
    });
    it('from numStr', () => {
      expect(Caster(numStr)).toBe(+numStr);
    });
    it('from negNumStr', () => {
      expect(Caster(negNumStr)).toBe(+negNumStr);
    });
    it('from emptyStr', () => {
      expect(() => Caster(emptyStr)).toThrow(CastError);
    });
    it('from number', () => {
      expect(Caster(number)).toBe(number);
    });
    it('from zeroNumber', () => {
      expect(Caster(zeroNumber)).toBe(zeroNumber);
    });
    it('from oneNumber', () => {
      expect(Caster(oneNumber)).toBe(oneNumber);
    });
    it('from bool', () => {
      expect(() => Caster(bool)).toThrow(CastError);
    });
    it('from obj', () => {
      expect(() => Caster(obj)).toThrow(CastError);
    });
    it('from date', () => {
      expect(() => Caster(date)).toThrow(CastError);
    });
  });
  describe('Booleans', () => {
    const Caster = validator.getCaster('boolean');
    it('from randomStr', () => {
      expect(() => Caster(randomStr)).toThrow(CastError);
    });
    it('from trueStr', () => {
      expect(Caster(trueStr)).toBe(true);
    });
    it('from numStr', () => {
      expect(() => Caster(numStr)).toThrow(CastError);
    });
    it('from negNumStr', () => {
      expect(() => Caster(negNumStr)).toThrow(CastError);
    });
    it('from emptyStr', () => {
      expect(() => Caster(emptyStr)).toThrow(CastError);
    });
    it('from number', () => {
      expect(() => Caster(number)).toThrow(CastError);
    });
    it('from zeroNumber', () => {
      expect(Caster(zeroNumber)).toBe(false);
    });
    it('from oneNumber', () => {
      expect(Caster(oneNumber)).toBe(true);
    });
    it('from bool', () => {
      expect(Caster(bool)).toBe(true);
    });
    it('from obj', () => {
      expect(() => Caster(obj)).toThrow(CastError);
    });
    it('from date', () => {
      expect(() => Caster(date)).toThrow(CastError);
    });
  });
  describe('Dates', () => {
    const Caster = validator.getCaster('date');
    it('from randomStr', () => {
      expect(() => Caster(randomStr)).toThrow(CastError);
    });
    it('from trueStr', () => {
      expect(() => Caster(trueStr)).toThrow(CastError);
    });
    it('from numStr', () => {
      expect(() => Caster(numStr)).toThrow(CastError);
    });
    it('from negNumStr', () => {
      expect(() => Caster(negNumStr)).toThrow(CastError);
    });
    it('from emptyStr', () => {
      expect(() => Caster(emptyStr)).toThrow(CastError);
    });
    it('from number', () => {
      expect(() => Caster(number)).toThrow(CastError);
    });
    it('from zeroNumber', () => {
      expect(() => Caster(zeroNumber)).toThrow(CastError);
    });
    it('from oneNumber', () => {
      expect(() => Caster(oneNumber)).toThrow(CastError);
    });
    it('from bool', () => {
      expect(() => Caster(bool)).toThrow(CastError);
    });
    it('from obj', () => {
      expect(() => Caster(obj)).toThrow(CastError);
    });
    it('from date', () => {
      expect(Caster(date)).toBe(date);
    });
    it('from dateStr1', () => {
      expect(Caster(dateStr1)).toBe(dateStr1);
    });
    it('from dateStr2', () => {
      expect(Caster(dateStr2)).toBe(dateStr2);
    });
    it('from dateStr3', () => {
      expect(Caster(dateStr3)).toBe(dateStr3);
    });
  });
});

describe('validator module performs basic validation of', () => {
  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = {x:'y'};
  const func = () => {};
  const bool = false;
  const date = new Date;

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
    expect(validator.isString(date)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
    expect(validator.isNumber(date)).toBeFalsy();
  });

  it('arrays', () => {
    expect(validator.isArray(str)).toBeFalsy();
    expect(validator.isArray(num)).toBeFalsy();
    expect(validator.isArray(arr)).toBeTruthy();
    expect(validator.isArray(obj)).toBeFalsy();
    expect(validator.isArray(func)).toBeFalsy();
    expect(validator.isArray(bool)).toBeFalsy();
    expect(validator.isArray(date)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isObject(str)).toBeFalsy();
    expect(validator.isObject(num)).toBeFalsy();
    expect(validator.isObject(arr)).toBeTruthy();
    expect(validator.isObject(obj)).toBeTruthy();
    expect(validator.isObject(func)).toBeFalsy();
    expect(validator.isObject(bool)).toBeFalsy();
    expect(validator.isObject(date)).toBeTruthy();
  });

  it('booleans', () => {
    expect(validator.isBoolean(str)).toBeFalsy();
    expect(validator.isBoolean(num)).toBeFalsy();
    expect(validator.isBoolean(arr)).toBeFalsy();
    expect(validator.isBoolean(obj)).toBeFalsy();
    expect(validator.isBoolean(func)).toBeFalsy();
    expect(validator.isBoolean(bool)).toBeTruthy();
    expect(validator.isBoolean(date)).toBeFalsy();
  });

  it('functions', () => {
    expect(validator.isFunction(str)).toBeFalsy();
    expect(validator.isFunction(num)).toBeFalsy();
    expect(validator.isFunction(arr)).toBeFalsy();
    expect(validator.isFunction(obj)).toBeFalsy();
    expect(validator.isFunction(func)).toBeTruthy();
    expect(validator.isFunction(bool)).toBeFalsy();
    expect(validator.isFunction(date)).toBeFalsy();
  });

  it('dates', () => {
    expect(validator.isDate(str)).toBeFalsy();
    expect(validator.isDate(num)).toBeFalsy();
    expect(validator.isDate(arr)).toBeFalsy();
    expect(validator.isDate(obj)).toBeFalsy();
    expect(validator.isDate(func)).toBeFalsy();
    expect(validator.isDate(date)).toBeTruthy();
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
