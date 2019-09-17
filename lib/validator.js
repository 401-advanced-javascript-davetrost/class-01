'use strict';

let validator = module.exports = {};

/**
 * Is this a string?
 * @param {*} input
 * @returns {boolean}
 */
validator.isString = (input) => {
  return typeof input === 'string';
};

/**
 * Is this a number defined as a number (and not a string that can be coerced as a number)? 
 * @param {*} input
 * @returns {boolean}
 */
validator.isNumber = (input) => {
  return typeof input === 'number';
};

/**
 * Is this an array?
 * @param {*} input
 * @returns {boolean}
 */
validator.isArray = (input) => {
  return input instanceof Array;
};

/**
 * Is this an object?
 * @param {*} input
 * @returns {boolean}
 */
validator.isObject = (input) => {
  return typeof input === 'object';
};

/**
 * Is this a boolean?
 * @param {*} input
 * @returns {boolean}
 */
validator.isBoolean = (input) => {
  return typeof input === 'boolean';
};

/**
 * Is this a function?
 * @param {*} input
 * @returns {boolean}
 */
validator.isFunction = (input) => {
  return input instanceof Function;
};

/**
 * Based on a set of rules, is the input valid?
 * @param input
 * @param rules - If rules is a string, the parameter defines the allowable input type as one of the following: 
 *                  'boolean', 'string', 'number', 'function'. 
 *                If rules is an object that contains the key 'arrayOf', then all items in the array will be held to the rule in rules.arrayOf. 
 *                  (Note: No other key-value pairs in rules will be considered in this case)
 *                TO BE CODED: If rules is defined as an object, each key of rules must exist in the input, and each key must have the type defined as the value of that key
 * @returns {boolean}
 */
const dictionaryOfValidationFunctions = {
  boolean: validator.isBoolean,
  string: validator.isString,
  number: validator.isNumber,
  function: validator.isFunction,
};
validator.isValid = (input, rules) => {
  if(validator.isObject(rules)) {
    if(rules.arrayOf) {
      return validator.isArray(input) && input.every((element) => validator.isValid(element, rules.arrayOf));
    }
  }

  if(validator.isString(rules) && dictionaryOfValidationFunctions[rules.toLowerCase()]) {
    return dictionaryOfValidationFunctions[rules.toLowerCase()](input);
  } 
  else {
    return false;
  }
};

