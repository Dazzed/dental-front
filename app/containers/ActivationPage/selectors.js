import { createSelector } from 'reselect';

/**
 * Direct selector to the app state domain
 */
function selectActivationPageDomain (state) {
  return state.activationPage;
}


/* eslint-disable import/prefer-default-export */
export const selectActivationPage = createSelector(
  selectActivationPageDomain,
  (substate) => substate
);
/* eslint-enable import/prefer-default-export */
