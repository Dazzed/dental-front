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
  (substate) => get(substate, 'authData.userType'),
);

const selectCurrentUser = createSelector(
  selectGlobal,
  (substate) => substate.currentUser
);

export {
  selectGlobal,
  selectCurrentUser,
};
