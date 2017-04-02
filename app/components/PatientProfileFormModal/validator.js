/*
Patient Profile Form Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import {
  PREFERRED_CONTACT_METHODS, US_STATES
} from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
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

};

export default validatorFactory(schema);
