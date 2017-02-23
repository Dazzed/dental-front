/*
Dentist Signup Form Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import {
  validatorFactory
} from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
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

  firstName: { presence: true },
  // middleName is optional
  lastName: { presence: true },

  phone: {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },
  specialtyId: { presence: { message: '^Please select an Specialty' } },
  zipCode: {
    presence: true,
    format: {
      pattern: /\d{5}?/,
      message: '^Please enter a 5-digit US zip code.',
    }
  },
};

export default validatorFactory(schema);
