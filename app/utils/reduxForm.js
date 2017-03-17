import validate from 'validate.js';
import forEach from 'lodash/forEach';
import moment from 'moment';

/* eslint-disable */
const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0/* first error */];

validate.extend(validate.validators.datetime, {
  // NOTE: value is an ISO string
  parse: function(value, options) {
    return +moment(value);
  },

  // NOTE: value is a unix timestamp
  format: function(value, options) {
    return options.dateOnly
      ? moment(value).format("M/D/YYYY")
      : moment(value).format("M/D/YYYY h:m:s");
  },
});

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
    const errors = validate(values, schema);
    /* eslint-disable no-return-assign */
    forEach(errors, (item, key) => errors[key] = item[0]);
    /* eslint-enable no-return-assign */
    // In case of no errors, we need to return empty object at least,
    // Otherwise, redux-form complains

    // Handle redux-forms that use <FormSection> to create nested forms.
    forEach(errors, (msg, key) => {
      const keyParts = key.split(".");
      if (keyParts.length > 1) {

        let parent = errors;
        forEach(keyParts, (keyPart, i) => {
          if (parent.hasOwnProperty(keyPart) === false) {
            parent[keyPart] = {};
          }

          if (i === keyParts.length - 1) {
            parent[keyPart] = msg;
          }

          parent = parent[keyPart];
        });

        delete errors[key]; // delete the combined key

      }
    });

    return errors || {};
  };
}
