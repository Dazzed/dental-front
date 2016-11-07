import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';
import moment from 'moment';


const selectors = {};

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
  (substate) => (
    filter(substate.myPatients,
      (patient) => (moment().diff(patient.createdAt, 'days') <= 5)
    )
  )
);

const selectNewReviews = createSelector(
  selectDentistDashboard,
  selectSorter,
  (substate) => (
    filter(substate.myPatients,
      (patient) => {
        const latestReview = get(patient, 'latestReview.createdAt');
        return (latestReview) &&
          (moment().diff(latestReview, 'days') <= 5);
      }
    )
  )
);

const selectAllMembers = createSelector(
  selectDentistDashboard,
  selectSorter,
  (substate) => substate.myPatients
);

const selectConversation = createSelector(
  selectDashboardDomain,
  (substate) => substate.messages
);

const selectNewMsgCount = createSelector(
  selectDashboardDomain,
  (substate) => substate.newMsgCountBySender
);

export function familyMembersToEditSelectorFactory (userId) {
  if (!selectors[userId]) {
    selectors[userId] = createSelector(
      selectDashboardDomain,
      (substate) => substate.familyMemberForms[userId]
    );
  }

  return selectors[userId];
}

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
  selectConversation,
  selectNewMsgCount,
};
