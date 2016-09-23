import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the app state domain
 */
function selectGlobal (state) {
  return state.global;
}

const selectCurrentUser = createSelector(
  selectGlobal,
  (substate) => get(substate, 'currentUser')
);

const selectUserType = createSelector(
  selectGlobal,
  (substate) => get(substate, 'currentUser.type'),
);

const selectUserId = createSelector(
  selectGlobal,
  (substate) => get(substate, 'currentUser.id'),
);

const selectUserName = createSelector(
  selectGlobal,
  (substate) => {
    const firstName = get(substate, 'currentUser.firstName');
    const lastName = get(substate, 'currentUser.lastName');
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return null;
  }
);

const selectAuthState = createSelector(
  selectGlobal,
  (substate) => substate.loggedIn,
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
  selectUserId,
  selectUserName,
  selectAuthState,
  selectCurrentUser,
  selectDentistSpecialties,
  selectPageTitle,
};
