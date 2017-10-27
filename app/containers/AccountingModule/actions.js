/* Accounting Actions
 * ========================================================================== */

/*
Imports
------------------------------------------------------------
*/
import {
  PATIENT_PAYMENTS_REQUEST,
  PATIENT_PAYMENTS_SUCCESS,
  PATIENT_PAYMENTS_FAILURE,

  DENTIST_PAYMENTS_REQUEST,
  DENTIST_PAYMENTS_SUCCESS,
  DENTIST_PAYMENTS_FAILURE,

  ADMIN_PAYMENTS_REQUEST,
  ADMIN_PAYMENTS_SUCCESS,
  ADMIN_PAYMENTS_FAILURE,

  SET_PAYMENT_FILTERS,
} from './constants';

/* Fetch Patient-Related Payments
 * ------------------------------------------------------ */
export function fetchPatientPayments(patientId, year) {
  return {
    type: PATIENT_PAYMENTS_REQUEST,
    patientId,
    year
  };
}

export function setPatientPayments(patientId, year, payments) {
  return {
    type: PATIENT_PAYMENTS_SUCCESS,
    patientId,
    year,
    payments
  };
}

export function setPatientPaymentsFailure(patientId, year, error) {
  return {
    type: PATIENT_PAYMENTS_FAILURE,
    patientId,
    year,
    error
  };
}

/* Fetch Dentist-Related Payments
 * ------------------------------------------------------ */
export function fetchDentistPayments(dentistId, year, month) {
  return {
    type: DENTIST_PAYMENTS_REQUEST,
    dentistId,
    year,
    month
  };
}

export function setDentistPayments(dentistId, year, month, payments) {
  return {
    type: DENTIST_PAYMENTS_SUCCESS,
    dentistId,
    year,
    month,
    payments
  };
}

export function setDentistPaymentsFailure(dentistId, year, month, error) {
  return {
    type: DENTIST_PAYMENTS_FAILURE,
    dentistId,
    year,
    month,
    error
  };
}

/* Fetch a Summary of all Payments
 * ------------------------------------------------------ */
// TODO

/* Set Payment Filters
 * ------------------------------------------------------\
 * Year is a 4 digit string.  EX: '1991'
 * Month is a 2 digit string. EX: '03' (March)
 *
 * NOTE: Year and month are optional.  If they aren't included, the existing
 *       value is left as-is in the reducer.
 */
export function setPaymentFilters(userId, year, month) {
  return {
    type: SET_PAYMENT_FILTERS,
    userId,
    year,
    month
  };
}
