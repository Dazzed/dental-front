import { createSelector } from 'reselect';
import { get, filter } from 'lodash';
import moment from 'moment';

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

const selectUserDashboard = createSelector(
  selectDashboardDomain,
  (substate) => substate.userDashboard
);

const selectDentistDashboard = createSelector(
  selectDashboardDomain,
  (substate) => substate.dentistDashboard,
);

const selectMyDentist = createSelector(
  selectUserDashboard,
  (substate) => substate.myDentist
);

const selectMyFamilyMembers = createSelector(
  selectUserDashboard,
  (substate) => substate.myFamilyMembers
);

const selectSorter = createSelector(
  selectDentistDashboard,
  (substate) => substate.sorter
);

const selectNewMembers = createSelector(
  selectDentistDashboard,
  selectSorter,
  (substate, sorter) => (
    filter(substate.myPatients,
      (patient) => (moment().diff(patient.createdAt, 'days') <= 5)
    )
  )
);

const selectNewReviews = createSelector(
  selectDentistDashboard,
  selectSorter,
  (substate, sorter) => (
    filter(substate.myPatients,
      (patient) => {
        const lastReviewDate = get(patient, 'lastReview.createdAt');
        return (lastReviewDate && moment().diff(lastReviewDate, 'days') <= 5);
      }
    )
  )
);

const selectAllMembers = createSelector(
  selectDentistDashboard,
  selectSorter,
  (substate, sorter) => {
    return substate.myPatients;
  }
);

export default selectDashboard;
export {
  selectDashboardDomain,
  selectUserDashboard,
  selectDentistDashboard,
  selectMyDentist,
  selectMyFamilyMembers,
  selectSorter,
  selectNewMembers,
  selectNewReviews,
  selectAllMembers,
};
