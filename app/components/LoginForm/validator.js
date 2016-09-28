// import { validatorFactory } from 'utils/reduxForm';

// const schema = {
//   email: { presence: true, email: true },
//   password: { presence: true },
// };

// export default validatorFactory(schema);

/* ******************************************************************
!!!
Sync Validation with this validatorFactory throws error on production
Let's use the following validator, otherwise, remove sync validation.
****************************************************************** */

import {
  createValidator,
  email,
  password,
  required,
} from 'utils/reduxForm';

const loginFormValidator = createValidator({
  email: [ required, email ],
  password: [ required, password ],
});

export default loginFormValidator;
