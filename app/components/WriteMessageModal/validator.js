import { validatorFactory } from 'utils/reduxForm';

const schema = {
  message: { presence: true },
};

export default validatorFactory(schema);
