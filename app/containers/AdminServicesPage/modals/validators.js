import { validatorFactory } from 'utils/reduxForm';

const schema = {
  name: {
    presence: true,
    format: {
      pattern: /^[a-zA-Z0-9\s]{1,64}$/,
      message: '^Please enter the Service Name.',
    },
  },
};

export default validatorFactory(schema);