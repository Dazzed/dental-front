import { SEX_TYPES } from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

const schema = {
  address: { presence: true },
  city: { presence: true },
  state: { presence: true },
  zipCode: { presence: true },
  phone: { presence: true, format: /\(\d{3}\)\s*(\d{3})\-(\d{4})/ },
  birthDate: { presence: true },
  sex: {
    presence: { message: '^Gender can\'t be blank' },
    inclusion: {
      within: Object.keys(SEX_TYPES),
      message: '^Gender can\'t be blank',
    },
  },
  officeId: {
    presence: { message: '^ Please select a dental office' },
  },
  contactMethod: {
    presence: true,
  }
};


export default validatorFactory(schema);
