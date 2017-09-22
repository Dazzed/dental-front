/*
Patient Profile Form Validator
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
  email: { presence: true, email: true },

  firstName: { presence: true },
  // middleName is optional
  lastName: { presence: true },
};

export default validatorFactory(schema);
