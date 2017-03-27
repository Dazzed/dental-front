/*
Dentist New Members Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import { createSelector } from 'reselect';

// app
import { selectCurrentUser } from 'containers/App/selectors';
import {
  selectDentistInfo,
  selectPatients,
  selectProcessedPatients,
} from 'containers/DentistMembersPage/selectors';

/*
Selectors
------------------------------------------------------------
*/
const domainSelector = state => state.dentistNewMembersPage;

/*
New Members
------------------------------------------------------------
*/
const selectPatientsWithNewMembers = createSelector(
  selectProcessedPatients,
  (patients) => {
    // precondition: patients are loaded
    if (patients === null) {
      return null;
    }

    const oneMonthAgo = moment().subtract(30, 'days');
    return patients.filter((patient) => {
      const patientCreatedAt = moment(patient.createdAt);
      let patientIsNew = patientCreatedAt.isSameOrAfter(oneMonthAgo, 'day');

      return patient.members.reduce((anyMemberIsNew, member) => {
        // precondition: skip checking other members if one is already new,
        // since all of a patient's members will be included in the results
        if (anyMemberIsNew === true) {
          return true;
        }            

        const memberCreatedAt = moment(member.createdAt);
        return memberCreatedAt.isSameOrAfter(oneMonthAgo, 'day');
      }, patientIsNew);
    });
  }
);

/*
Data Loaded
------------------------------------------------------------
*/
const selectDataLoaded = createSelector(
  selectCurrentUser,
  selectDentistInfo,
  selectPatients,
  (user, dentistInfo, patients) => {
    return user !== false && dentistInfo !== null && patients !== null;
  }
);
 
 
/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  selectDataLoaded,
  selectPatientMembers,
  selectPatientsWithNewMembers,
};
