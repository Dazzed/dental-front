/*
Member Form Modal Validator
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
  SEX_TYPES
} from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  firstName: { presence: true },
  // TODO: middle name?
  lastName: { presence: true },

  familyRelationship: { presence: true },
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
  contactMethod: {
    presence: true,
    inclusion: {
      within: Object.keys(PREFERRED_CONTACT_METHODS),
      message: '^Preferred contact method can\'t be blank',
    }
  },

  email: { presence: true, email: true },
  phone: {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },
};

export default validatorFactory(schema);
