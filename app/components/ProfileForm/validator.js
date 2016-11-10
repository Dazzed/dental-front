import { validatorFactory } from 'utils/reduxForm';

const schema = {
  // email: { presence: true, email: true },
  // password: {
  //   presence: true,
  //   format: {
  //     pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\$\/\*!]{6,}$/,
  //     message: `^Password should have at least 6 characters, upper case,
  //       lower case and numbers.`,
  //   }
  // },
  // confirmPassword: { presence: true, equality: 'password' },
  firstName: { presence: true },
  lastName: { presence: true },
  address: { presence: true },
  city: { presence: true },
  state: { presence: true },
  zipCode: { presence: true },
  phone: { presence: true, format: /\(\d{3}\)\s*(\d{3})\-(\d{4})/ },
  contactMethod: { presence: true },
  // birthDate: { presence: true },
};


export default validatorFactory(schema);

