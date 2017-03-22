/*
Dentist Members Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';

// app
import { selectCurrentUser } from 'containers/App/selectors';

/*
Domain Selector
------------------------------------------------------------
*/
const domainSelector = state => state.dentistMembersPage;

/*
Patients
------------------------------------------------------------
*/
const selectPatients = createSelector(
  domainSelector,
  (substate) => substate.patients
);

const selectMemberSearchTerm = createSelector(
  domainSelector,
  (substate) => substate.searchName
);

const selectMemberSortTerm = createSelector(
  domainSelector,
  (substate) => substate.sortStatus
);

const selectProcessedPatients = createSelector(
  selectPatients,
  selectMemberSearchTerm,
  selectMemberSortTerm,
  (patients, searchName, sortStatus) => {
    // precondition: patients are null
    if (patients === null) {
      return patients;
    }

    let processedPatients = patients;

    // search
    if (searchName !== null) {
      searchName = searchName.toLowerCase();

      processedPatients = patients.filter((patient) => {
        const patientName = patient.firstName + ' ' + patient.lastName;
        const matchesPatient = patientName.toLowerCase().indexOf(searchName) > -1;

        const matchesAnyMember = patient.members.some((member) => {
          const memberName = member.firstName + ' ' + member.lastName;
          return memberName.toLowerCase().indexOf(searchName) > -1;
        });

        return matchesPatient || matchesAnyMember;
      });
    }

    // sort
    // TODO: Once individual member subscription status' are available, the
    //       sort should take those into account.
    processedPatients = processedPatients.sort((patientA, patientB) => {
      // one matches, the other doesn't
      const matchA = patientA.subscription.status === sortStatus;
      const matchB = patientB.subscription.status === sortStatus;

      if (matchA === false && matchB === true) {
        return -1;
      }
      else if (matchA === true && matchB === false) {
        return 1;
      }

      // both match or both don't match
      const nameA = patientA.firstName + ' ' + patientA.lastName;
      const nameB = patientB.firstName + ' ' + patientB.lastName;

      if (nameA < nameB) {
        return -1
      }
      else if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    return processedPatients;
  }
);

/*
Data Loaded
------------------------------------------------------------
*/
const selectDataLoaded = createSelector(
  selectCurrentUser,
  selectPatients,
  (user, patients) => {
    return user !== false && patients !== null;
  }
);
 
/*
Export
------------------------------------------------------------
*/
 export default domainSelector;

export {
  selectDataLoaded,
  selectMemberSearchTerm,
  selectMemberSortTerm,
  selectPatients,
  selectProcessedPatients,
};
