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
  SEX_TYPES
} from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  firstName: { presence: true },
  lastName: { presence: true },

  sex: {
    presence: { message: '^Sex can\'t be blank' },
    inclusion: {
      within: Object.keys(SEX_TYPES),
      message: '^Sex can\'t be blank',
    },
  },
  birthDate: {
    presence: true,
    datetime: {
      latest: moment().toISOString(),
    },
  },

  familyRelationship: { presence: true },

  // TODO: membership type
};

export default validatorFactory(schema);
