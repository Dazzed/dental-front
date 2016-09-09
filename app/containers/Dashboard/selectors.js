import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboard state domain
 */
const selectDashboardDomain = state => state.dashboard;

/**
 * Other specific selectors
 */


/**
 * Default selector used by Dashboard
 */

const selectDashboard = createSelector(
  selectDashboardDomain,
  (substate) => substate
);

const selectMyDentist = createSelector(
  selectDashboardDomain,
  (substate) => substate.myDentist
);

const selectMyFamilyMembers = createSelector(
  selectDashboardDomain,
  (substate) => substate.myFamilyMembers
);

export default selectDashboard;
export {
  selectDashboardDomain,
  selectMyDentist,
  selectMyFamilyMembers,
};
