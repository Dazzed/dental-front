/*
Dentist Members Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import get from 'lodash/get';
import { createSelector } from 'reselect';

// app
import { selectCurrentUser } from 'containers/App/selectors';

/*
Selectors
================================================================================
*/
const domainSelector = state => state.dentistMembersPage;

/*
Search / Sort Patients
------------------------------------------------------------
*/
const selectMemberSearchTerm = createSelector(
  domainSelector,
  (substate) => substate.searchName
);

const selectMemberSortTerm = createSelector(
  domainSelector,
  (substate) => substate.sortStatus
);

const selectDentistReports = createSelector(
  domainSelector,
  (substate) => substate.dentistReports
);

/*
Fetch
------------------------------------------------------------
*/
const selectDentistInfo = createSelector(
  domainSelector,
  (substate) => substate.dentistInfo
);

const dentistSpecialtiesSelector = createSelector(
  domainSelector,
  (substate) => get(substate, 'dentistSpecialties')
);

const selectPatients = createSelector(
  domainSelector,
  (substate) => substate.patients
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
    processedPatients = processedPatients.sort((patientA, patientB) => {
      // one matches w/ some members, the other doesn't
      const matchA = patientA.members.some((member) => {
        return member.subscription.status === sortStatus;
      });
      const matchB = patientB.members.some((member) => {
        return member.subscription.status === sortStatus;
      });

      if (matchA === true && matchB === false) {
        return -1;
      }
      else if (matchA === false && matchB === true) {
        return 1;
      }

      // one matches w/ every member, the other doesn't
      const matchAllA = patientA.members.every((member) => {
        return member.subscription.status === sortStatus;
      });
      const matchAllB = patientB.members.every((member) => {
        return member.subscription.status === sortStatus;
      });

      if (matchAllA === true && matchAllB === false) {
        return -1;
      }
      else if (matchAllA === false && matchAllB === true) {
        return 1;
      }

      // both match or both don't match
      const nameA = (patientA.firstName + ' ' + patientA.lastName).toLowerCase();
      const nameB = (patientB.firstName + ' ' + patientB.lastName).toLowerCase();

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

const selectDataLoaded = createSelector(
  selectCurrentUser,
  selectDentistInfo,
  selectPatients,
  (user, dentistInfo, patients) => {
    console.log('user', user, 'di', dentistInfo, 'patients', patients);
    return user !== false && dentistInfo !== null && patients !== null;
  }
);

/*
Add / Edit
------------------------------------------------------------
*/
const selectEditingMember = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'member') {
      return substate.editing;
    }

    return null;
  }
);

const selectEditingPatientProfile = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'patientProfile') {
      return substate.editing;
    }

    return null;
  }
);

const selectEditingPatientPayment = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'patientPayment') {
      return substate.editing;
    }

    return null;
  }
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  // search / sort patients
  selectMemberSearchTerm,
  selectMemberSortTerm,
  selectDentistReports,

  // fetch
  selectDentistInfo,
  dentistSpecialtiesSelector,
  selectPatients,
  selectProcessedPatients,
  selectDataLoaded,

  // add / edit
  selectEditingMember,
  selectEditingPatientProfile,
  selectEditingPatientPayment,
};
