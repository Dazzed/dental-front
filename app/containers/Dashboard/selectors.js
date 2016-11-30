import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';
import moment from 'moment';


const selectors = {};

/**
 * Direct selector to the dashboard state domain
 */
const domainSelector = state => state.dashboard;


const selectDashboard = createSelector(
  domainSelector,
  (substate) => substate
);


const myDentistSelector = createSelector(
  domainSelector,
  (substate) => substate.myDentist
);


const myMembersSelector = createSelector(
  domainSelector,
  (substate) => substate.myMembers
);


const selectSorter = createSelector(
  (substate) => substate
);


const newMembersSelector = createSelector(
  domainSelector,
  (substate) => (
    filter(substate.myPatients,
      (patient) => (moment().diff(patient.createdAt, 'days') <= 5)
    )
  )
);


const newReviewsSelector = createSelector(
  domainSelector,
  (substate) => (
    filter(substate.myPatients, (patient) => {
      const latestReview = get(patient, 'latestReview.createdAt');
      return (latestReview) && (moment().diff(latestReview, 'days') <= 5);
    })
  )
);


const allMembersSelector = createSelector(
  domainSelector,
  (substate) => substate.myPatients
);


const selectConversation = createSelector(
  domainSelector,
  (substate) => substate.messages
);


const selectNewMsgCount = createSelector(
  domainSelector,
  (substate) => substate.newMsgCountBySender
);

export function familyMembersToEditSelectorFactory (userId) {
  if (!selectors[userId]) {
    selectors[userId] = createSelector(
      domainSelector,
      (substate) => substate.familyMemberForms[userId]
    );
  }

  return selectors[userId];
}

export default selectDashboard;

export {
  domainSelector,
  selectSorter,
  selectConversation,
  selectNewMsgCount,
  myDentistSelector,
  myMembersSelector,
  newMembersSelector,
  newReviewsSelector,
  allMembersSelector,
};
