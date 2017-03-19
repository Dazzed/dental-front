import { createSelector } from 'reselect';
import get from 'lodash/get';

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

const selectUserNameParts = createSelector(
  selectGlobal,
  (substate) => (
    {
      firstName: get(substate, 'currentUser.firstName'),
      middleName: get(substate, 'currentUser.middleName'),
      lastName: get(substate, 'currentUser.lastName')
    }
  )
);

const selectAuthState = createSelector(
  selectGlobal,
  (substate) => substate.loggedIn,
);

const selectAuthLoadingState = createSelector(
  selectGlobal,
  (substate) => substate.loggedIn && !substate.currentUser,
);

const selectServices = createSelector(
  selectGlobal,
  (substate) => get(substate, 'services')
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
  selectUserNameParts,
  selectAuthState,
  selectAuthLoadingState,
  selectCurrentUser,
  selectPageTitle,
  selectServices,
};
