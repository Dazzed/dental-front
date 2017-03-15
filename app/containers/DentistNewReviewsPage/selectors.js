/*
Dentist New Reviews Page Selectors
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import { createSelector } from 'reselect';
import moment from 'moment';

// app
import { selectCurrentUser } from 'containers/App/selectors';
import { selectPatients } from 'containers/DentistMembersPage/selectors';

/*
Selectors
------------------------------------------------------------
*/
const domainSelector = state => state.dentistNewReviewsPage;

/*
Reviews
------------------------------------------------------------
*/
const selectPatientReviews = createSelector(
  domainSelector,
  (substate) => substate.patientReviews
);

const selectNewReviews = createSelector(
  selectPatientReviews,
  (patientReviews) => {
    // precondition: the patient reviews must already be loaded
    if (patientReviews === null) {
      return null;
    }

    const oneWeekAgo = moment().subtract('days', 7);
    return patientReviews.filter((patientReview) => {
      return moment(patientReview.review.createdAt).isSameOrAfter(oneWeekAgo, 'day');
    });
  }
);

/*
Data Loaded
------------------------------------------------------------
*/
const selectDataLoaded = createSelector(
  selectCurrentUser,
  selectPatients,
  selectPatientReviews,
  (user, patients, patientReviews) => {
    return user !== false && patients !== null && patientReviews !== null;
  }
);
 
/*
Export
------------------------------------------------------------
*/
export default domainSelector;

export {
  selectDataLoaded,
  selectNewReviews,
  selectPatientReviews,
};
