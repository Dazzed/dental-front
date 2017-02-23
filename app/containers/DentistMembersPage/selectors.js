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
  selectPatients,
};
