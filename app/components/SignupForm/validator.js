/*
Signup Form Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import moment from 'moment';

// app
import {
  PREFERRED_CONTACT_METHODS, SEX_TYPES, US_STATES
} from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  firstName: { presence: true },
  // middleName is optional
  lastName: { presence: true },

  birthDate: {
    presence: true,
    datetime: {
      latest: moment().toISOString(),
    },
  },
  sex: {
    presence: { message: '^Sex can\'t be blank' },
    inclusion: {
      within: Object.keys(SEX_TYPES),
      message: '^Sex can\'t be blank',
    },
  },

  address: { presence: true },
  city: { presence: true },
  state: {
    presence: true,
    inclusion: {
      within: Object.keys(US_STATES),
      message: '^State can\'t be blank',
    }
  },
  zipCode: {
    presence: true,
    format: {
      pattern: /\d{5}?/,
      message: '^Please enter a 5-digit US zip code.',
    }
  },

  officeId: {
    presence: { message: '^Please select a dental office' },
  },
  phone: {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },
  contactMethod: {
    presence: true,
    inclusion: {
      within: Object.keys(PREFERRED_CONTACT_METHODS),
      message: '^Preferred contact method can\'t be blank',
    }
  },

  email: { presence: true, email: true },
  confirmEmail: { presence: true, email: true, equality: 'email' },

  password: {
    presence: true,
    format: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\$\/\*!]{6,}$/,
      message: `^Password should have at least 6 characters, upper case,
        lower case and numbers.`,
    }
  },
  confirmPassword: { presence: true, equality: 'password' },
};

export default validatorFactory(schema);
