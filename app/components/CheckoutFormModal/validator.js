/*
Checkout Form Validator
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import {
  MONTH_NUMBERS,
} from 'common/constants';
import { validatorFactory } from 'utils/reduxForm';

/*
Schema
------------------------------------------------------------
*/
const schema = {
  cardNumber: {
    presence: true,
    format: {
      pattern: /^\d{13,16}$/,
      message: '^Please enter a valid 13-16 digit credit card number.',
    },
  },
  fullName: {
    presence: true,
    format: {
      pattern: /^[a-zA-Z0-9\s]{1,64}$/,
      message: '^Please enter the name shown on your card exactly as it appears.  Only letters, numbers, and spaces are allowed.',
    },
  },

  month: {
    presence: true,
    inclusion: {
      within: Object.keys(MONTH_NUMBERS),
      message: '^Expiration month can\'t be blank.',
    },
  },
  year: {
    presence: true,
    format: {
      pattern: /^(17|18|19|[2-9][0-9])$/,
      message: '^Expiration year can\'t be blank.',
    },
  },
  cardCode: {
    presence: true,
    format: {
      pattern: /^\d{3,4}$/,
      message: 'Please enter your 3 or 4 digit CVV number, which can usually be found on the back of your card.',
    },
  },
  zip: {
    presence: true,
    format: {
      pattern: /\d{5}?/,
      message: '^Please enter a 5-digit US zip code.',
    },
  },

  periodontalDiseaseWaiver: {
    presence: { message: '^You must agree to all waivers in order to create an account.' },
  },
  cancellationFeeWaiver: {
    presence: { message: '^You must agree to all waivers in order to create an account.' },
  },
  reEnrollmentFeeWaiver: {
    presence: { message: '^You must agree to all waivers in order to create an account.' },
  },
  termsAndConditions: {
    presence: { message: '^You must agree to the Terms and Conditions in order to create an account.' },
  },

};

export default validatorFactory(schema);