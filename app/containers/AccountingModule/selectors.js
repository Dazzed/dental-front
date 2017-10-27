/* Accounting Page Selectors
 * ========================================================================== */

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';

/* Select Domain
 * ------------------------------------------------------ */
const domainSelector = state => state.accountingReducer;

/* Payment Filters
 * ------------------------------------------------------ */
const paymentFiltersSelector = createSelector(
  domainSelector,
  (substate) => {
    return substate.paymentFilters;
  }
);

/* Patient Payments
 * ------------------------------------------------------ */
const patientPaymentsSelector = createSelector(
  domainSelector,
  paymentFiltersSelector,
  (substate, filters) => {
    if ( substate.patientPayments[filters.userId] !== undefined
      && substate.patientPayments[filters.userId][filters.year] !== undefined
    ) {
      return substate.patientPayments[filters.userId][filters.year];
    } else {
      return null;
    }
  }
);

/* Dentist Payments
 * ------------------------------------------------------ */
const dentistPaymentsSelector = createSelector(
  domainSelector,
  paymentFiltersSelector,
  (substate, filters) => {
    if ( substate.dentistPayments[filters.userId] !== undefined
      && substate.dentistPayments[filters.userId][filters.year] !== undefined
      && substate.dentistPayments[filters.userId][filters.year][filters.month] !== undefined
    ) {
      return substate.dentistPayments[filters.userId][filters.year][filters.month];
    } else {
      return null;
    }
  }
);

/* Admin Payments
 * ------------------------------------------------------ */
// TODO

/*
Export
------------------------------------------------------------ */
export default domainSelector;

export {
  patientPaymentsSelector,
  dentistPaymentsSelector,
  // TODO: admin

  paymentFiltersSelector,
};
