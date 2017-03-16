/*
Dentist Signup Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
import get from 'lodash/get';
import { createSelector } from 'reselect';

const domainSelector = state => state.dentistSignupPage;

/*
Fetch Selectors
------------------------------------------------------------
*/
const dentistSpecialtiesSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'dentistSpecialties')
);

const pricingCodesSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'pricingCodes'),
);

/*
Signup Selectors
------------------------------------------------------------
*/
const fullNameSelector = createSelector(
  domainSelector,
  (substate) => substate.fullName,
);

const isSignedUpSelector = createSelector(
  domainSelector,
  (substate) => substate.dentistCreated,
);

/*
Exports
------------------------------------------------------------
*/
export default domainSelector;

export {
  // fetch
  dentistSpecialtiesSelector,
  pricingCodesSelector,

  // signup
  fullNameSelector,
  isSignedUpSelector,
};
