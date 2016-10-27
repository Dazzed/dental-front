import { validatorFactory } from 'utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
  message: { presence: true },
};

export default validatorFactory(schema);
