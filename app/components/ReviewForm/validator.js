/*
Review Form Validator
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
  rating: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 10,
      strict: true,
    },
  },

  review: {
    presence: true,
  },
};

export default validatorFactory(schema);
