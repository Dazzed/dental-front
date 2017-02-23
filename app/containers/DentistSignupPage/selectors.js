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
Signup Form Selectors
------------------------------------------------------------
*/
const formSelector = state => get(state, 'form.dentist-signup.syncErrors');

const firstNameErrorSelector = createSelector(
  formSelector,
  (substate) => get(substate, 'firstName'),
);

const lastNameErrorSelector = createSelector(
  formSelector,
  (substate) => get(substate, 'lastName'),
);

const isFirstNameTouched = createSelector(
  formSelector,
  (substate) => get(substate, 'firstName.touched'),
);

const isLastNameTouched = createSelector(
  formSelector,
  (substate) => get(substate, 'lastName.touched'),
);

const isInvalidNameSelector = createSelector(
  firstNameErrorSelector,
  lastNameErrorSelector,
  isFirstNameTouched,
  isLastNameTouched,
  (firstName, lastName, firstNameTouched, lastNameTouched) =>
    (!!(firstName || lastName) && (firstNameTouched || lastNameTouched))
);

/*
Exports
------------------------------------------------------------
*/
export default domainSelector;

export {
  // fetch
  dentistSpecialtiesSelector,

  // signup
  fullNameSelector,
  isSignedUpSelector,

  // signup form
  isInvalidNameSelector,
};
