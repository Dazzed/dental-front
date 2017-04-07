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
  name: { presence: true },

  email: { presence: true, email: true },

  message: { presence: true },
};

export default validatorFactory(schema);
