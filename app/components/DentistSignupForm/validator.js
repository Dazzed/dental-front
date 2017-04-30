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

  "user.email": { presence: true, email: true },
  "user.confirmEmail": { presence: true, email: true, equality: 'user.email' },

  "user.password": {
    presence: true,
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\$\/\*!]{8,}$/,
      message: `^Password must be at least 8 characters and include one (1) special character and one (1) capital letter.`,
    }
  },
  "user.confirmPassword": { presence: true, equality: 'user.password' },

  /*
  Office Info
  ------------------------------------------------------------
  */
  "officeInfo.officeName": { presence: true },
  "officeInfo.specialtyId": { presence: { message: '^Please select a Specialty' } },

  "officeInfo.email": { presence: true, email: true },
  "officeInfo.phone": {
    presence: true,
    format: {
      pattern: /\(\d{3}\) \d{3}-\d{4}?/,
      message: '^Please enter a 10-digit US phone number.'
    }
  },

  "officeInfo.url": {
    presence: { message: '^Website URL can\'t be blank' },
    url: { message: '^Please enter the full URL, including the "http://". For example: "https://mydentistrysite.com".' },
  },

  "officeInfo.message": { presence: true },

  "officeInfo.address": { presence: true },
  "officeInfo.city": { presence: true },
  "officeInfo.state": {
    presence: true,
    inclusion: {
      within: Object.keys(US_STATES),
      message: '^Please select a State',
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
  // NOTE: There is no explicit "images" form section.  See the
  //       `Image Uploaders` portion of DentistSignupForm/index.js for the
  //       details.
  //
  // Image fields are:
  //
  //   - `user.avatar`
  //   - `officeInfo.logo`
  //   - `officeInfo.officeImages0`
  //   - `officeInfo.officeImages1`
  //   - `officeInfo.officeImages2`

  /*
  Pricing
  ------------------------------------------------------------
  */
  // Each priceCode uses field level validation.  See the `Field Validators`
  // section of DentistSignupForm/index.js for that validation.

  "pricing.adultMonthlyFee": {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 19.99,
      strict: true,
    },
  },
  "pricing.childMonthlyFee": {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 14.99,
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
  Services
  ------------------------------------------------------------
  */
  // services are optional
  // acceptsChildren is optional

  "services.childStartingAge": {
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      strict: true,
    }
  },

  /*
  Working Hours
  ------------------------------------------------------------
  */
  // "workingHours.[dayName].open" are all optional
  // "workingHours.[dayName].start" depends on if it's open or not
  // "workingHours.[dayName].end" depends on if it's open or not

  /*
  Marketplace Opt In
  ------------------------------------------------------------
  */
  // "marketplace.optIn" is optional
};

export default validatorFactory(schema);
