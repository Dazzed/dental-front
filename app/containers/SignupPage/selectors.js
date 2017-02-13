/*
Signup Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
import { createSelector } from 'reselect';
 
/*
Selectors
------------------------------------------------------------
*/
const domainSelector = state => state.signupPage;

const fullNameSelector = createSelector(
  domainSelector,
  (substate) => substate.fullName,
);

const isSignedUpSelector = createSelector(
  domainSelector,
  (substate) => substate.patientCreated,
);

const officesSelector = createSelector(
  domainSelector,
  (substate) => substate.offices,
);

/*
Exports
------------------------------------------------------------
*/
export default domainSelector;

export {
  fullNameSelector,
  isSignedUpSelector,
  officesSelector,
};
