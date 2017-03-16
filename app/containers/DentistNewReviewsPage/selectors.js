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
    // precondition: the patient's reviews must already be loaded
    if (patientReviews === null) {
      return null;
    }

    const oneWeekAgo = moment().subtract('days', 7);
    return patientReviews.filter((patientReview) => {
      return moment(patientReview.review.createdAt).isSameOrAfter(oneWeekAgo, 'day');
    });
  }
);

const selectRecentReviewers = createSelector(
  selectNewReviews,
  (newReviews) => {
    // precondition: the patient's reviews must already be loaded
    if (newReviews === null) {
      return null;
    }

    // {reviewer, reviews} indexed by `reviewer.id`
    return newReviews.reduce((recentReviewersCollector, newReview) => {
      const reviewer = newReview.reviewer;
      const review = newReview.review;

      if (recentReviewersCollector.hasOwnProperty(reviewer.id) === false) {
        recentReviewersCollector[reviewer.id] = {
          reviewer: reviewer,
          reviews: [],
        };
      }

      recentReviewersCollector[reviewer.id].reviews.push(review);

      return recentReviewersCollector;
    }, {});
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
  selectRecentReviewers,
};
