import { validatorFactory } from 'utils/reduxForm';

const schema = {
  planName: { presence: true },
  fee: { presence: true }
};

export default validatorFactory(schema);
