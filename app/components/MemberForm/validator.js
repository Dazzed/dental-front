import { SEX_TYPES } from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  familyRelationship: { presence: true },
  email: { presence: true, email: true },
  birthDate: { presence: true },
  phone: { presence: true, format: /\(\d{3}\)\s*(\d{3})\-(\d{4})/ },
  sex: {
    presence: { message: '^Gender can\'t be blank' },
    inclusion: {
      within: Object.keys(SEX_TYPES),
      message: '^Gender can\'t be blank',
    },
  },
  contactMethod: { presence: true }
};

export default validatorFactory(schema);
