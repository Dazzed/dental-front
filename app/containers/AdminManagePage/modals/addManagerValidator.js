import { validatorFactory } from 'utils/reduxForm';

const schema = {
  firstName: {
    presence: true,
    format: {
      pattern: /^[a-zA-Z0-9\s]{1,64}$/,
      message: '^Please enter the First Name.',
    },
  },
  lastName: {
    presence: true,
    format: {
      pattern: /^[a-zA-Z0-9\s]{1,64}$/,
      message: '^Please enter the Last Name.',
    },
  },
  email: {
    presence: true, email: true
  },
  phone: {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  }
};

export default validatorFactory(schema);