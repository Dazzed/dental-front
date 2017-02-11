/*
Your Dentist Page Selectors
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
------------------------------------------------------------
*/
const domainSelector = state => state.yourDentistPage;

const dentistSelector = createSelector(
  domainSelector,
  (substate) => { return substate.dentist; }
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  dentistSelector,
};
