import validator from 'validate.js';
import lodash from 'lodash';
import moment from 'moment';


validator.extend(validator.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: (value) => {
    return +moment.utc(value, 'MM/DD/YYYY');
  },
  // Input is a unix timestamp
  format: (value, options) => {
    const format = options.dateOnly ? 'MM/DD/YYYY' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  }
});

const schema = {

  firstName: {
    presence: true,
  },
  lastName: {
    presence: true,
  },
  birthDate: {
    presence: {
      message: 'is not a valid date',
    },
    datetime: {
      dateOnly: true,
    }
  },
  phone: {
    presence: true,
  },
  address: {
    presence: true,
  },
  sex: {
    presence: true,
  },
  city: {
    presence: true,
  },
  state: {
    presence: true,
  },
  zipCode: {
    presence: true,
  },
  tos: {
    presence: {
      message: 'You have to accept the terms and conditions',
    },
  },
};


export default values => {
  const errors = validator(values, schema);
  lodash.forEach(errors, (item, key) =>
    errors[key] = item[0]
  );
  return errors;
};
