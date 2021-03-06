/*
Patient Reviews Page Selectors
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
import {
  dentistSelector,
  membersSelector,
} from 'containers/PatientProfilePage/selectors';

/*
Selectors
------------------------------------------------------------
*/
const domainSelector = state => state.patientReviewsPage;

/*
Data Loaded
------------------------------------------------------------
*/
const selectDataLoaded = createSelector(
  selectCurrentUser,
  dentistSelector,
  membersSelector,
  (user, dentist, members) => {
    return user !== false && dentist !== false && members !== false;
  }
);

/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  selectDataLoaded,
};
