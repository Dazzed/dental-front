/*
Member Form Modal Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  phone: {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },
  email: {
    presence: true, email: true
  },
  affordabilityScore: {
    presence: false,
    format: {
      pattern: /[1-4]/,
      message: 'Affordabilty score can only be between 1-4.'
    }
  }
};

export default validatorFactory(schema);
