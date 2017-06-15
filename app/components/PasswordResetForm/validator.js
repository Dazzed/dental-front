import { validatorFactory } from 'utils/reduxForm';

const schema = {
  newPassword: { presence: true },
  token: { presence: true },
  confirmNewPassword: { presence: true },
};

export default validatorFactory(schema);
