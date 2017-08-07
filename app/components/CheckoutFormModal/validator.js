/*
Checkout Form Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import {
  US_STATES,
} from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  number: {
    presence: true,
    format: {
      pattern: /^\d{4,4} \d{4,4} \d{4,4} \d{4,4}$/,
      message: '^Please enter a valid 13-16 digit credit card number.',
    },
  },
  cvc: {
    presence: true,
    format: {
      pattern: /^\d{3,4}$/,
      message: 'Please enter your 3 or 4 digit CVV number, which can usually be found on the back of your card.',
    },
  },

  fullName: {
    presence: true,
    format: {
      pattern: /^[a-zA-Z0-9\s]{1,64}$/,
      message: '^Please enter the name shown on your card exactly as it appears.  Only letters, numbers, and spaces are allowed.',
    },
  },
  expiry: {
    presence: true,
    format: {
      pattern: /^(0[1-9]|1[0-2])\/(17|18|19|[2-9][0-9])$/,
      message: '^Please enter a 2 digit month number followed by a 2 digit year number: MM/YY.',
    }
  },

  address: { presence: true },
  city: { presence: true },
  state: {
    presence: true,
    inclusion: {
      within: Object.keys(US_STATES),
      message: '^Please select a State',
    }
  },
  zip: {
    presence: true,
    format: {
      pattern: /\d{5}?/,
      message: '^Please enter a 5-digit US zip code.',
    }
  },

};

export default validatorFactory(schema);
