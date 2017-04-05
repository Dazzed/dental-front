/*
Contact Us Form Modal Validator
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

  message: { presence: true },
};

export default validatorFactory(schema);
