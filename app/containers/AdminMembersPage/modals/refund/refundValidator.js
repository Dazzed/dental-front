import { validatorFactory } from 'utils/reduxForm';

const schema = {
  amount: {
    presence: true,
  },
};

export default validatorFactory(schema);