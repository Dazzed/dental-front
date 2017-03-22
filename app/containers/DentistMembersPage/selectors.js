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
    // TODO

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
