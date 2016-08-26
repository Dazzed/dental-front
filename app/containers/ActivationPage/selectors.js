import { createSelector } from 'reselect';

/**
 * Direct selector to the app state domain
 */
function selectActivationPageDomain (state) {
  return state.activationPage;
}

export const selectActivationPage = createSelector(
  selectActivationPageDomain,
  (substate) => substate
);
