/* Admin Page Actions
 * ========================================================================== */
// local
import {
  // fetch dentists
  FETCH_DENTISTS_REQUEST,
  FETCH_DENTISTS_SUCCESS,
  FETCH_DENTISTS_ERROR,

  // fetch dentist details
  FETCH_DENTIST_DETAILS_REQUEST,
  FETCH_DENTIST_DETAILS_SUCCESS,
  FETCH_DENTIST_DETAILS_ERROR,

  // fetch dentist members
  FETCH_DENTIST_MEMBERS_REQUEST,
  FETCH_DENTIST_MEMBERS_SUCCESS,
  FETCH_DENTIST_MEMBERS_ERROR,

  // fetch dentist reviews
  FETCH_DENTIST_REVIEWS_REQUEST,
  FETCH_DENTIST_REVIEWS_SUCCESS,
  FETCH_DENTIST_REVIEWS_ERROR,

  // fetch dentist
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_ERROR,

  // set selected dentist
  SET_SELECTED_DENTIST,

  // search / sort patients
  SEARCH,
  SORT,

  // delete review
  DELETE_DENTIST_REVIEW_REQUEST,
  DELETE_DENTIST_REVIEW_SUCCESS,
  DELETE_DENTIST_REVIEW_ERROR,
} from './constants';


/* Fetch
 * ========================================================================== */

/* Fetch Dentists
 * ------------------------------------------------------ */
export function fetchDentists () {
  return {
    type: FETCH_DENTISTS_REQUEST,
  };
}

export function fetchDentistsSuccess (payload) {
  return {
    type: FETCH_DENTISTS_SUCCESS,
    payload,
  };
}

export function fetchDentistsError (payload) {
  return {
    type: FETCH_DENTISTS_ERROR,
    payload,
  };
}

/* Fetch Dentist Details
 * ------------------------------------------------------ */
export function fetchDentistDetails (dentistId) {
  return {
    type: FETCH_DENTIST_DETAILS_REQUEST,
    dentistId,
  };
}

export function fetchDentistDetailsSuccess (payload) {
  return {
    type: FETCH_DENTIST_DETAILS_SUCCESS,
    payload,
  };
}

export function fetchDentistDetailsError (payload) {
  return {
    type: FETCH_DENTIST_DETAILS_ERROR,
    payload,
  };
}

/* Fetch Dentist Members
 * ------------------------------------------------------ */
export function fetchDentistMembers (dentistId) {
  return {
    type: FETCH_DENTIST_MEMBERS_REQUEST,
    dentistId,
  };
}

export function fetchDentistMembersSuccess (payload) {
  return {
    type: FETCH_DENTIST_MEMBERS_SUCCESS,
    payload,
  };
}

export function fetchDentistMembersError (payload) {
  return {
    type: FETCH_DENTIST_MEMBERS_ERROR,
    payload,
  };
}


/* Fetch Dentist Reviews
 * ------------------------------------------------------ */
export function fetchDentistReviews (dentistId) {
  return {
    type: FETCH_DENTIST_REVIEWS_REQUEST,
    dentistId,
  };
}

export function fetchDentistReviewsSuccess (payload) {
  return {
    type: FETCH_DENTIST_REVIEWS_SUCCESS,
    payload,
  };
}

export function fetchDentistReviewsError (payload) {
  return {
    type: FETCH_DENTIST_REVIEWS_ERROR,
    payload,
  };
}

/* Fetch Stats
 * ------------------------------------------------------ */
export function fetchStats () {
  return {
    type: FETCH_STATS_REQUEST,
  };
}

export function fetchStatsSuccess (payload) {
  return {
    type: FETCH_STATS_SUCCESS,
    payload,
  };
}

export function fetchStatsError (payload) {
  return {
    type: FETCH_STATS_ERROR,
    payload,
  };
}


/* Setters
 * ========================================================================== */
export function setSelectedDentist (dentist) {
  return {
    type: SET_SELECTED_DENTIST,
    dentist,
  };
}


/* Search / Sort
 * ========================================================================== */
 export function search (name) {
  return {
    type: SEARCH,
    name,
  };
}

export function sort (status) {
  return {
    type: SORT,
    status,
  };
}


/* Actions
 * ========================================================================== */

/* Delete Dentist Review
 * ------------------------------------------------------ */
export function deleteDentistReview (dentistId, reviewId) {
  return {
    type: DELETE_DENTIST_REVIEW_REQUEST,
    dentistId,
    reviewId,
  };
}

export function deleteDentistReviewSuccess (dentistId, reviewId) {
  return {
    type: DELETE_DENTIST_REVIEW_SUCCESS,
    dentistId,
    reviewId,
  };
}

export function deleteDentistReviewError (payload) {
  return {
    type: DELETE_DENTIST_REVIEW_ERROR,
    payload,
  };
}