/*
Patient Dentist Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  DENTIST_REQUEST,
  DENTIST_SUCCESS,
  DENTIST_ERROR,

  SET_EDITING_REVIEW,
  CLEAR_EDITING_REVIEW,
  SUBMIT_REVIEW_FORM,
  SEND_REVIEW_SUCCESS,
} from './constants';

/*
Fetch Dentist
------------------------------------------------------------
*/
export function fetchDentist() {
  return {
    type: DENTIST_REQUEST,
  };
}

export function setDentist (payload) {
  return {
    type: DENTIST_SUCCESS,
    payload,
  };
}

export function setDentistErrors (payload) {
  return {
    type: DENTIST_ERROR,
    payload,
  };
}

/*
Send Review
------------------------------------------------------------
*/
export function setEditingReview (review) {
  return {
    type: SET_EDITING_REVIEW,
    review,
  };
}

export function clearEditingReview (review) {
  return {
    type: CLEAR_EDITING_REVIEW,
  };
}

export function submitReviewForm (payload, dentistId) {
  return {
    type: SUBMIT_REVIEW_FORM,
    payload,
    dentistId,
  };
}

export function setSentReview (payload, dentistId) {
  return {
    type: SEND_REVIEW_SUCCESS,
    payload,
    dentistId,
  };
}
