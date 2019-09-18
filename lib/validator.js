'use strict';

const CastError = require('../lib/Errors').CastError;

let validator = module.exports = {};

/**
 * Is this a string?
 * @param {*} input
 * @returns {boolean}
 * @function isString
 */
validator.isString = (input) => {
  return typeof input === 'string';
};

/**
 * Is this a number defined as a number (and not a string that can be coerced as a number)? 
 * @param {*} input
 * @returns {boolean}
 * @function isNumber
 */
validator.isNumber = (input) => {
  return typeof input === 'number';
};

/**
 * Is this an array?
 * @param {*} input
 * @returns {boolean}
 * @function isArray
 */
validator.isArray = (input) => {
  return input instanceof Array;
};

/**
 * Is this an object?
 * @param {*} input
 * @returns {boolean}
 * @function isObject
 */
validator.isObject = (input) => {
  return typeof input === 'object';
};

/**
 * Is this a boolean?
 * @param {*} input
 * @returns {boolean}
 * @function isBoolean
 */
validator.isBoolean = (input) => {
  return typeof input === 'boolean';
};

/**
 * Is this a function?
 * @param {*} input
 * @returns {boolean}
 * @function isFunction
 */
validator.isFunction = (input) => {
  return input instanceof Function;
};

/**
 * Cast the input as a String or throw an error
 * @param {*} input
 * @returns {String}
 * @function castString
 */
validator.castString = (input) => {
  if(validator.isString(input)) {
    return input;
  }
  if(validator.isNumber(input)) {
    return `${input}`;
  }
  throw new CastError('string', input);
};

/**
 * Cast the input as a Number or throw an error
 * @param {*} input
 * @returns {Number}
 * @function castNumber
 */
validator.castNumber = (input) => {
  if(input === '') {
    input = 'empty';
  }
  if(validator.isString(input) && !isNaN(Number(input))) {
    return +input;
  }
  if(validator.isNumber(input)) {
    return input;
  }
  throw new CastError('number', input);
};

/**
 * Cast the input as a Boolean or throw an error
 * @param {*} input
 * @returns {Boolean}
 * @function castBoolean
 */
validator.castBoolean = (input) => {
  if(validator.isString(input) && (input === 'true' || input === 'false')) {
    return input ? true : false;
  }
  if(validator.isNumber(input) && (input === 0 || input === 1)) {
    return input ? true : false;
  }
  if(validator.isBoolean(input)) {
    return input;
  }
  throw new CastError('boolean', input);
};

/**
 * Based on a given type, what is correct casting function?
 * @param type
 * @returns {function}
 * @function getCaster
 */
const casterDictionary = {
  boolean: validator.castBoolean,
  string: validator.castString,
  number: validator.castNumber,
  date: validator.castDate,
  array: validator.castArray,
};
validator.getCaster = (type) => {
  return casterDictionary[type];
};


