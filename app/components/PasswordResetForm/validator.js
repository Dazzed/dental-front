import { validatorFactory } from 'utils/reduxForm';

const schema = {
  password: { presence: true },
  token: { presence: true },
  confirmPassword: { presence: true },
};

export default validatorFactory(schema);
