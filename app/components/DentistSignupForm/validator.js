import { validatorFactory } from 'utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
  confirmEmail: { presence: true, email: true, equality: 'email' },
  password: { presence: true },
  confirmPassword: { presence: true, equality: 'password' },
  firstName: { presence: true },
  lastName: { presence: true },
  phone: { presence: true },
  dentistSpecialty: { presence: { message: '^Select an Specialty' } },
  zipCode: { presence: true },
  tos: { presence: { message: '^You have to accept the Terms of service' } },
};


export default validatorFactory(schema);

