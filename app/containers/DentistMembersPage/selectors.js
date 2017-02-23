/*
Dentist Members Page Selectors
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
const domainSelector = state => state.dentistMembersPage;

// TODO

// EXAMPLE
/*
const dentistSelector = createSelector(
  domainSelector,
  (substate) => { return substate.dentist; }
);
*/
 
/*
Export
------------------------------------------------------------
*/
 export default domainSelector;

export {
  // TODO
};
