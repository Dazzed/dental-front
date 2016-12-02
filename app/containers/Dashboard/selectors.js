import { createSelector } from 'reselect';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import some from 'lodash/some';
import moment from 'moment';


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


const patientSearchTermSelector = createSelector(
  domainSelector,
  (substate) => substate.patientSearchTerm
);

const groupedAndFilteredPatientsSelector = createSelector(
  domainSelector,
  patientSearchTermSelector,
  fnGroupPatients
);

const autosuggestPatientsSelector = createSelector(
  domainSelector,
  (substate) => (
    map(
      substate.myPatients,
      (patient) => {
        const patientName = `${patient.firstName} ${patient.lastName}`;
        const himself = [ { fullName: patientName } ];
        return {
          fullName: patientName,
          members:
            himself.concat(
              map(patient.members, (member) => ({
                fullName: `${member.firstName} ${member.lastName}`
              }))
            )
        };
      }
    )
  )
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
  groupedAndFilteredPatientsSelector,
  patientSearchTermSelector,
  autosuggestPatientsSelector,
};

function fnGroupPatients (substate, term) {
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
    ).filter(patient => isPatientMatchingTerm(patient, term));
  }

  function getNewReviews () {
    return filter(
      substate.myPatients,
      (patient) => {
        const latestReview = get(patient, 'latestReview.createdAt');
        return (latestReview) &&
          (moment().diff(latestReview, 'days') <= 30);
      }
    ).filter(patient => isPatientMatchingTerm(patient, term));
  }

  function getActiveMembers () {
    return filter(
      substate.myPatients,
      (patient) => {
        const status = get(patient, 'subscription.status');
        return (status) && status === 'active';
      }
    ).filter(patient => isPatientMatchingTerm(patient, term));
  }

  function getInactiveMembers () {
    return filter(
      substate.myPatients,
      (patient) => {
        const status = get(patient, 'subscription.status');
        return (status) && status === 'inactive';
      }
    ).filter(patient => isPatientMatchingTerm(patient, term));
  }

  function getAllReviews () {
    return filter(
      substate.myPatients,
      (patient) => {
        const latestReview = get(patient, 'latestReview.createdAt');
        return !!latestReview;
      }
    ).filter(patient => isPatientMatchingTerm(patient, term));
  }
}

function isPatientMatchingTerm (patient, term) {
  if (term === '') {
    return true;
  }

  const hasMatchingFamilyMember = some(
        patient.members || [],
        (member) => `${member.firstName} ${member.lastName}` === term
      );

  return hasMatchingFamilyMember
      || `${patient.firstName} ${patient.lastName}` === term;
}
