import validator from 'validate.js';
import forEach from 'lodash/forEach';

/* eslint-disable */
const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0/* first error */];

export function email (value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function password (value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\$\/\*!]{6,}$/i.test(value)) {
    return 'Password should have at least 6 characters, upper case, lower case and numbers.';
  }
}
/* eslint-enable max-len */

export function required (value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength (min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength (max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer (value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf (enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match (field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator (rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

/**
 * Function used to create validators with Validate.js
 */
export function validatorFactory (schema) {
  return values => {
    const errors = validator(values, schema);
    /* eslint-disable no-return-assign */
    forEach(errors, (item, key) => errors[key] = item[0]);
    /* eslint-enable no-return-assign */
    // In case of no errors, we need to return empty object at least,
    // Otherwise, redux-form complains
    return errors || {};
  };
}
