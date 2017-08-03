/*
Dentist New Reviews Page Selectors
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
const domainSelector = state => state.dentistNewReviewsPage;

/*
Reviews
------------------------------------------------------------
*/
const selectPatientReviews = createSelector(
  selectProcessedPatients,
  (patients) => {
    // precondition: patients are loaded
    if (patients === null) {
      return null;
    }

    return patients.reduce((reviewsCollector, patient) => {
      // precondition: the patient has written a review
      if (!patient.client ||
          !Array.isArray(patient.client.clientReviews) ||
          patient.client.clientReviews.length === 0) {
        return reviewsCollector;
      }

      var patientReviews = patient.client.clientReviews.map((review) => {
        return {
          reviewer: patient,
          review: review,
        };
      });

      return patientReviews.concat(reviewsCollector);
    }, []);
  }
);

const selectNewReviews = createSelector(
  selectPatientReviews,
  (patientReviews) => {
    // precondition: the patient's reviews must already be loaded
    if (patientReviews === null) {
      return null;
    }

    const oneWeekAgo = moment().subtract(7, 'days');
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
    const recentReviewers = newReviews.reduce((recentReviewersCollector, newReview) => {
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

    // Order each reviews array from most recent to least.  String comparisons
    // will work since ISO date-times include all digits in all fields, even if
    // the leading one is 0.
    for (let reviewerId in recentReviewers) {
      if (recentReviewers.hasOwnProperty(reviewerId)) {

        const reviews = recentReviewers[reviewerId].reviews;
        recentReviewers[reviewerId].reviews = reviews.sort((reviewA, reviewB) => {
          if (reviewA.createdAt > reviewB.createdAt) {
            return -1;
          }
          else if (reviewA.createdAt < reviewB.createdAt) {
            return 1;
          }

          return 0;
        });

      }
    }

    return recentReviewers;
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
  selectNewReviews,
  selectPatientReviews,
  selectRecentReviewers,
};
