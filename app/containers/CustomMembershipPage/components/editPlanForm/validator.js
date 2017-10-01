import { validatorFactory } from 'utils/reduxForm';

const schema = {
  price: { presence: true }
};

export default validatorFactory(schema);
