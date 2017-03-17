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
  User Info
  ------------------------------------------------------------
  */
  "user.firstName": { presence: true },
  // "user.middleName" is optional
  "user.lastName": { presence: true },

  "user.phone": {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },
  "user.specialtyId": { presence: { message: '^Please select a Specialty' } },

  "user.email": { presence: true, email: true },
  "user.confirmEmail": { presence: true, email: true, equality: 'email' },
  "user.password": {
    presence: true,
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\$\/\*!]{8,}$/,
      message: `^Password must be at least 8 characters and include one (1) special character and one (1) capital letter.`,
    }
  },
  "user.confirmPassword": { presence: true, equality: 'password' },

  /*
  Office Info
  ------------------------------------------------------------
  */
  "officeInfo.officeName": { presence: true },
  "officeInfo.url": { presence: true, url: true },
  "officeInfo.email": { presence: true, email: true },
  "officeInfo.phone": {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },
  "officeInfo.message": { presence: true },

  "officeInfo.address": { presence: true },
  "officeInfo.city": { presence: true },
  "officeInfo.state": {
    presence: true,
    inclusion: {
      within: Object.keys(US_STATES),
      message: '^State can\'t be blank',
    }
  },
  "officeInfo.zipCode": {
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

  "pricing.adultMonthlyFee": {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },
  "pricing.childMonthlyFee": {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },
  "pricing.adultYearlyFee": {
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },
  "pricing.childYearlyFee": {
    numericality: {
      greaterThanOrEqualTo: 0,
      strict: true,
    },
  },

  // "pricing.adultYearlyFeeActivated" is optional
  // "pricing.childYearlyFeeActivated" is optional

  "pricing.treatmentDiscount": {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 100,
      strict: true,
    }
  },

  /*
  Marketplace Opt In
  ------------------------------------------------------------
  */
  // "marketplace.optIn" is optional

  /*
  Services
  ------------------------------------------------------------
  */
  // services are optional

  /*
  Working Hours
  ------------------------------------------------------------
  */
  // "workingHours.[dayName].open" are all optional
  // "workingHours.[dayName].start" depends on if it's open or not
  // "workingHours.[dayName].end" depends on if it's open or not
};

export default validatorFactory(schema);
