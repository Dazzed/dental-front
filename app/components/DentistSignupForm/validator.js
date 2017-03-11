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
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\$\/\*!]{8,}$/,
      message: `^Password must be at least 8 characters and include one (1) special character and one (1) capital letter.`,
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
