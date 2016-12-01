import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';
import some from 'lodash/some';
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


const memberFormOpenedSelector = createSelector(
  domainSelector,
  subtate => subtate.memberFormOpened
);


const editingMemberSelector = createSelector(
  domainSelector,
  subtate => subtate.editingMember
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


const allPatientsSelector = createSelector(
  domainSelector,
  (substate) => substate.myPatients
);


const groupedPatientsSelector = createSelector(
  domainSelector,
  fnGroupPatients
);

const patientSearchTermSelector = createSelector(
  domainSelector,
  (substate) => substate.patientSearchTerm
);


const selectConversation = createSelector(
  domainSelector,
  (substate) => substate.messages
);


const selectNewMsgCount = createSelector(
  domainSelector,
  (substate) => substate.newMsgCountBySender
);

export default selectDashboard;

export {
  domainSelector,
  memberFormOpenedSelector,
  editingMemberSelector,
  selectSorter,
  selectConversation,
  selectNewMsgCount,
  myDentistSelector,
  myMembersSelector,
  allPatientsSelector,
  groupedPatientsSelector,
  patientSearchTermSelector,
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
        const status = get(patient, 'subscription.status');
        return (status) && status === 'active';
      }
    );
  }

  function getInactiveMembers () {
    return filter(
      substate.myPatients,
      (patient) => {
        const status = get(patient, 'subscription.status');
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

function isPatientMatchingTerm (patient, term) {
  const hasMatchingFamilyMember = some(
        patient.familyMembers || [],
        (member) => member.firstName.toLowerCase().indexOf(term) > -1
                  || member.lastName.toLowerCase().indexOf(term) > -1
      );

  return hasMatchingFamilyMember
      || patient.firstName.toLowerCase().indexOf(term) > -1
      || patient.firstName.toLowerCase().indexOf(term) > -1;
}
