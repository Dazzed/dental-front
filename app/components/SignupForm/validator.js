import { validatorFactory } from 'utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
  confirmEmail: { presence: true, email: true, equality: 'email' },
  password: { presence: true },
  confirmPassword: { presence: true, equality: 'password' },
  firstName: { presence: true },
  lastName: { presence: true },
  address: { presence: true },
  city: { presence: true },
  state: { presence: true },
  zipCode: { presence: true },
  phone: { presence: true },
  birthDate: { presence: true },
  tos: {
    presence: { message: '^You have to accept the Terms of service' },
    inclusion: {
      within: [ true ],
      message: '^You have to accept the Terms of service',
    },
  },
};


export default validatorFactory(schema);

