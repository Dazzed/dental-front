/*
Dentist Signup Form Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import {
  US_STATES
} from 'common/constants';
import {
  validatorFactory
} from 'utils/reduxForm';

/*
Schema
================================================================================
*/
const schema = {

  /*
  Office Info
  ------------------------------------------------------------
  */
  officeName: { presence: true },
  specialtyId: { presence: { message: '^Please select a Specialty' } },
  phone: {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },
  url: { presence: true, url: true },
  message: { presence: true },

  email: { presence: true, email: true },
  confirmEmail: { presence: true, email: true, equality: 'email' },
  password: {
    presence: true,
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\$\/\*!]{8,}$/,
      message: `^Password must be at least 8 characters and include one (1) special character and one (1) capital letter.`,
    }
  },
  confirmPassword: { presence: true, equality: 'password' },

  address: { presence: true },
  city: { presence: true },
  state: {
    presence: true,
    inclusion: {
      within: Object.keys(US_STATES),
      message: '^State can\'t be blank',
    }
  },
  zipCode: {
    presence: true,
    format: {
      pattern: /\d{5}?/,
      message: '^Please enter a 5-digit US zip code.',
    }
  },

  /*
  Images
  ------------------------------------------------------------
  */
  // TODO: require images?
  // TODO: need to actually upload them first...

  /*
  Pricing
  ------------------------------------------------------------
  */
  // Each priceCode's price is validated at the field level.
  adultMonthlyFee: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },
  childMonthlyFee: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },
  adultYearlyFee: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },
  // adultYearlyFeeActivated is optional
  childYearlyFee: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },
  // childYearlyFeeActivated is optional

  /*
  Marketplace Opt In
  ------------------------------------------------------------
  */
  // marketplaceOptIn is optional

  /*
  Services
  ------------------------------------------------------------
  */
  // services are optional

  /*
  Hours
  ------------------------------------------------------------
  */
  // hours-[dayName]-open are optional

  // Can't validate the hours-[dayName]-start and hours-[dayName]-end since this
  // can't be used to compare fields.

};

export default validatorFactory(schema);
