import validator from 'validate.js';
import lodash from 'lodash';

const schema = {
  email: {
    presence: true,
    email: true,
  },
  confirmEmail: {
    presence: true,
    email: true,
    equality: 'email'
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
    equality: 'password'
  },
};


export default values => {
  const errors = validator(values, schema);
  lodash.forEach(errors, (item, key) =>
    errors[key] = item[0]
  );
  return errors;
};
