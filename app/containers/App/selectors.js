import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the app state domain
 */
function selectGlobal (state) {
  return state.global;
}

const selectUserType = createSelector(
  selectGlobal,
  (substate) => get(substate, 'currentUser.type'),
);

const selectAuthState = createSelector(
  selectGlobal,
  (substate) => substate.loggedIn,
);

const selectCurrentUser = createSelector(
  selectGlobal,
  (substate) => get(substate, 'currentUser')
);

const selectDentistSpecialties = createSelector(
  selectGlobal,
  (substate) => get(substate, 'dentistSpecialties')
);

const selectPageTitle = createSelector(
  selectGlobal,
  (substate) => get(substate, 'pageTitle')
);


export {
  selectGlobal,
  selectUserType,
  selectAuthState,
  selectCurrentUser,
  selectDentistSpecialties,
  selectPageTitle,
};
