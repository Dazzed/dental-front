/* Accounting Reducer
 * ========================================================================== */

/*
Imports
------------------------------------------------------------
*/
// libs
import findIndex from 'lodash/findIndex';
import moment from 'moment';

// local
import {
  PATIENT_PAYMENTS_SUCCESS,
  PATIENT_PAYMENTS_FAILURE,

  DENTIST_PAYMENTS_SUCCESS,
  DENTIST_PAYMENTS_FAILURE,

  ADMIN_PAYMENTS_SUCCESS,
  ADMIN_PAYMENTS_FAILURE,

  SET_PAYMENT_FILTERS,
} from './constants';

/* Initial State
 * ------------------------------------------------------ */
const initialState = {
  patientPayments: {}, // patientId => year => payments array
  dentistPayments: {}, // dentistId => year => month => payments array
  // TODO: admin payments summary

  paymentFilters: {
    userId: null,
    year: moment().format('YYYY'),
    month: moment().format('MM'),
  },
};

/* Reducer
 * ------------------------------------------------------ */
function accountingReducer(state = initialState, action) {
  let updatedPatientPayments;
  let updatedDentistPayments;
  let updatedPaymentFilters;

  switch (action.type) {

    /* Patient Payments
     * ------------------------------------------------------ */
    case PATIENT_PAYMENTS_SUCCESS:
      updatedPatientPayments = {
        ...state.patientPayments
      };
      if (updatedPatientPayments[action.patientId] === undefined) {
        updatedPatientPayments[action.patientId] = {};
      }
      updatedPatientPayments[action.patientId][action.year] = action.payments;

      return {
        ...state,
        patientPayments: updatedPatientPayments
      };

    case PATIENT_PAYMENTS_FAILURE:
      updatedPatientPayments = {
        ...state.patientPayments
      };
      if (updatedPatientPayments[action.patientId] === undefined) {
        updatedPatientPayments[action.patientId] = {};
      }
      updatedPatientPayments[action.patientId][action.year] = {
        error: action.error
      };

      return {
        ...state,
        patientPayments: updatedPatientPayments
      };

    /* Dentist Payments
     * ------------------------------------------------------ */
    case DENTIST_PAYMENTS_SUCCESS:
      updatedDentistPayments = {
        ...state.dentistPayments
      };
      if (updatedDentistPayments[action.dentistId] === undefined) {
        updatedDentistPayments[action.dentistId] = {};
      }
      if (updatedDentistPayments[action.dentistId][action.year] === undefined) {
        updatedDentistPayments[action.dentistId][action.year] = {};
      }
      updatedDentistPayments[action.dentistId][action.year][action.month] = action.payments;

      return {
        ...state,
        updatedDentistPayments: updatedDentistPayments,
      };

    case DENTIST_PAYMENTS_FAILURE:
      updatedDentistPayments = {
        ...state.dentistPayments
      };
      if (updatedDentistPayments[action.dentistId] === undefined) {
        updatedDentistPayments[action.dentistId] = {};
      }
      if (updatedDentistPayments[action.dentistId][action.year] === undefined) {
        updatedDentistPayments[action.dentistId][action.year] = {};
      }
      updatedDentistPayments[action.dentistId][action.year][action.month] = {
        error: action.error
      };

      return {
        ...state,
        updatedDentistPayments: updatedDentistPayments,
      };

    /* Admin Payments
     * ------------------------------------------------------ */
    // TODO

    /* Payment Filers
     * ------------------------------------------------------ */
    case SET_PAYMENT_FILTERS:
      updatedPaymentFilters = {
        ...state.paymentFilters,
        userId: action.userId,
      };

      if (action.year !== undefined && action.year !== null) {
        updatedPaymentFilters.year = action.year;
      }

      if (action.month !== undefined && action.month !== null) {
        updatedPaymentFilters = action.month;
      }

      return {
        ...state,
        paymentFilters: updatedPaymentFilters
      }

    /*
    Default
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default accountingReducer;