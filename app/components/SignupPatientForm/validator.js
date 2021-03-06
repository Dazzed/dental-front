/*
Patient Signup Form Validator
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
  PREFERRED_CONTACT_METHODS,
  SEX_TYPES,
  US_STATES,
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
      latest: moment().subtract(18, 'years').toISOString(),
      message: '^You need to be atleast 18 years old to create an account.',
    },
  },
  sex: {
    presence: { message: '^Sex can\'t be blank' },
    inclusion: {
      within: Object.keys(SEX_TYPES),
      message: '^Sex can\'t be blank',
    },
  },

  email: { presence: true, email: true },
  confirmEmail: { presence: true, email: true, equality: 'email' },

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

  password: {
    presence: true,
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\$\/\*!]{8,}$/,
      message: `^Password must be at least 8 characters and include one (1) capital letter, one (1) number.`,
    }
  },
  confirmPassword: { presence: true, equality: 'password' },

  officeId: {
    presence: { message: '^Please select a dental office' },
  },

  membershipId: {
    presence: true,
  },
};

export default validatorFactory(schema);
