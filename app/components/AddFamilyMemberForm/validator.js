import { validatorFactory } from 'utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  familyRelationship: { presence: true },
  email: { presence: true, email: true },
  birthDate: { presence: true },
  phone: { presence: true },
};

export default validatorFactory(schema);
