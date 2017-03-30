/*
Patients Dentist Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';

/*
Selectors
================================================================================
*/
const domainSelector = state => state.patientDentistPage;

/*
Fetch
------------------------------------------------------------
*/
const dentistSelector = createSelector(
  domainSelector,
  (substate) => { return substate.dentist; }
);

/*
Send Review
------------------------------------------------------------
*/
const editingActiveSelector = createSelector(
  domainSelector,
  (substate) => {
    return substate.editingActive;
  }
);

const editingReviewSelector = createSelector(
  domainSelector,
  substate => substate.editingReview,
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  dentistSelector,

  editingActiveSelector,
  editingReviewSelector,
};
