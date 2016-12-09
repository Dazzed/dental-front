import { validatorFactory } from 'utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  familyRelationship: { presence: true },
  email: { presence: true, email: true },
  birthDate: { presence: true },
  phone: { presence: true, format: /\(\d{3}\)\s*(\d{3})\-(\d{4})/ },
};

export default validatorFactory(schema);
