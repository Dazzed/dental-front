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
import { selectPatients } from 'containers/DentistMembersPage/selectors';

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
  domainSelector,
  (substate) => substate.patientsWithNewMembers
);

/*
Data Loaded
------------------------------------------------------------
*/
const selectDataLoaded = createSelector(
  selectCurrentUser,
  selectPatients,
  selectPatientsWithNewMembers,
  (user, patients, patientsWithNewMembers) => {
    return user !== false && patients !== null && patientsWithNewMembers !== null;
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
