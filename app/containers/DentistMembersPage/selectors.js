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

    if (searchName !== null) {
      processedPatients = patients.filter((patient) => {
        const matchesPatient = (patient.firstName + ' ' + patient.lastName).toLowerCase().indexOf(searchName) > -1;
        const matchesAnyMember = patient.members.some((member) => {
          return (member.firstName + ' ' + member.lastName).toLowerCase().indexOf(searchName) > -1;
        });

        return matchesPatient || matchesAnyMember;
      });
    }

    if (sortStatus !== null) {
      // TODO: sort
    }

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
