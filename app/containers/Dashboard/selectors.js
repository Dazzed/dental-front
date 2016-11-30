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

const selectAllMembers = createSelector(
  selectDentistDashboard,
  selectSorter,
  (substate) => substate.myPatients
);

const selectGroupedPatients = createSelector(
  selectDentistDashboard,
  fnGroupPatients
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
  selectGroupedPatients,
  selectAllMembers,
  selectConversation,
  selectNewMsgCount,
};

function fnGroupPatients (substate) {
  return {
    newMembers: getNewMembers(),
    newReviews: getNewReviews(),
    activeMembers: getActiveMembers(),
    inactiveMembers: getInactiveMembers(),
    allReviews: getAllReviews()
  };

  function getNewMembers () {
    return filter(
      substate.myPatients,
      (patient) => (moment().diff(patient.createdAt, 'days') <= 30)
    );
  }

  function getNewReviews () {
    return filter(
      substate.myPatients,
      (patient) => {
        const latestReview = get(patient, 'latestReview.createdAt');
        return (latestReview) &&
          (moment().diff(latestReview, 'days') <= 30);
      }
    );
  }

  function getActiveMembers () {
    return filter(
      substate.myPatients,
      (patient) => {
        const status = get(patient, 'subscriptions[0].status');
        return (status) && status === 'active';
      }
    );
  }

  function getInactiveMembers () {
    return filter(
      substate.myPatients,
      (patient) => {
        const status = get(patient, 'subscriptions[0].status');
        return (status) && status === 'inactive';
      }
    );
  }

  function getAllReviews () {
    return filter(
      substate.myPatients,
      (patient) => {
        const latestReview = get(patient, 'latestReview.createdAt');
        return !!latestReview;
      }
    );
  }
}
