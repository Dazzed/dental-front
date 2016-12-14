import { validatorFactory } from 'utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
  confirmEmail: { presence: true, email: true, equality: 'email' },
  password: {
    presence: true,
    format: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\$\/\*!]{6,}$/,
      message: `^Password should have at least 6 characters, upper case,
        lower case and numbers.`,
    }
  },
  confirmPassword: { presence: true, equality: 'password' },
  firstName: { presence: true },
  lastName: { presence: true },
};


export default validatorFactory(schema);

