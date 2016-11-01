import { validatorFactory } from 'utils/reduxForm';

export const officeInformationValidator = validatorFactory({
  officeName: { presence: true },
  url: { presence: true, url: true },
  email: { presence: true, email: true },
  phone: { presence: true, format: /\(\d{3}\)\s*(\d{3})\-(\d{4})/ },
  message: { presence: true },
  address: { presence: true },
  city: { presence: true },
  state: { presence: true },
  zipCode: { presence: true },
});


export default {
  officeInformationValidator,
};
