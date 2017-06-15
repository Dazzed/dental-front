import { validatorFactory } from 'utils/reduxForm';

const schema = {
  password: { presence: true },
  password_again: { presence: true },
};

export default validatorFactory(schema);
