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
Search / Filter Patients
------------------------------------------------------------
*/
const selectMemberSearchTerm = createSelector(
  domainSelector,
  (substate) => substate.searchName
);

const selectMemberFilterTerm = createSelector(
  domainSelector,
  (substate) => substate.filterStatus
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
  (substate) => {
    let { dentistInfo } = substate;
    if (dentistInfo) {
      dentistInfo.memberships = replaceDefaultToStandard(dentistInfo.memberships);
    }
    return dentistInfo
  }
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
  selectMemberFilterTerm,
  (patients, searchName, filterStatus) => {
    // precondition: patients are null
    if (patients === null) {
      return patients;
    }

    let processedPatients = patients;

    // search
    if (searchName !== null) {
      searchName = searchName.toLowerCase();

      processedPatients = patients.filter((patient) => {
        return [...patient.members, patient]
          .map((member) => {
            return (member.firstName + ' ' + member.lastName).toLowerCase();
          })
          .some((name) => {
            return name.indexOf(searchName) > -1;
          });
      });
    }

    // filter
    processedPatients = processedPatients.filter((patient) => {
      // precondition: don't apply a filter
      if (filterStatus === "all") {
        return true;
      }

      const statuses = [...patient.members, patient]
        .map((member) => {
          let status = member.subscription
            ? member.subscription.status
            : 'inactive';

          if (status === 'cancellation_requested') {
            status = 'active';
          }

          if (status === 'canceled') {
            status = 'inactive';
          }

          return status;
        });

        let matches;
        if (filterStatus === 'inactive') {
          matches = statuses.every((status) => {
            return status === filterStatus;
          });
        }
        else {
          matches = statuses.some((status) => {
            return status === filterStatus;
          });
        }

        return matches;
    });

    // sort by name to organize the results
    processedPatients = processedPatients.sort((patientA, patientB) => {
      const nameA = (patientA.firstName + ' ' + patientA.lastName).toLowerCase();
      const nameB = (patientB.firstName + ' ' + patientB.lastName).toLowerCase();

      if (nameA < nameB) {
        return -1;
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

const editingSecuritySelector = createSelector(
  domainSelector,
  (substate) => {
    if (substate.editingActive === 'security') {
      return substate.editing;
    }

    return null;
  }
);

const dentistRatingSelector = createSelector(
  domainSelector,
  substate => {
    if (substate.patients) {
      let iterations = 0;
      const rating = substate.patients.reduce((acc, p) => {
        if (p.clientReviews.length) {
          iterations++;
          acc += p.clientReviews[0].rating;
        }
        return acc;
      }, 0);
      return Math.round(rating / iterations);
    }
    return 0;
  }
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  // search / filter patients
  selectMemberSearchTerm,
  selectMemberFilterTerm,
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
  editingSecuritySelector,
  dentistRatingSelector,
};

function replaceDefaultToStandard(memberships) {
  if (memberships) {
    return memberships.map(m => {
      return {
        ...m,
        name: m.name.replace('default','standard')
      };
    });
  } else {
    return memberships;
  }
}
