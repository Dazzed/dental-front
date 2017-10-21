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

  // fetch dentist reports
  FETCH_DENTIST_REPORTS_REQUEST,
  FETCH_DENTIST_REPORTS_SUCCESS,
  FETCH_DENTIST_REPORTS_ERROR,

  // fetch dentist reviews
  FETCH_DENTIST_REVIEWS_REQUEST,
  FETCH_DENTIST_REVIEWS_SUCCESS,
  FETCH_DENTIST_REVIEWS_ERROR,

  // fetch dentist stats
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_ERROR,

  // set selected dentist
  SET_SELECTED_DENTIST,

  // search / sort patients
  SEARCH,
  SORT,

  // edit dentist
  EDIT_DENTIST_REQUEST,
  EDIT_DENTIST_SUCCESS,
  EDIT_DENTIST_ERROR,
  SET_EDITING_DENTIST_ID,

  // download report
  DOWNLOAD_REPORT_REQUEST,
  DOWNLOAD_REPORT_SUCCESS,
  DOWNLOAD_REPORT_ERROR,

  // download master report
  DOWNLOAD_MASTER_REPORT_REQUEST,
  DOWNLOAD_MASTER_REPORT_SUCCESS,
  DOWNLOAD_MASTER_REPORT_ERROR,

  // delete review
  DELETE_DENTIST_REVIEW_REQUEST,
  DELETE_DENTIST_REVIEW_SUCCESS,
  DELETE_DENTIST_REVIEW_ERROR,

  //managers
  FETCH_MANAGERS_REQUEST,
  TOGGLE_REFUNDING_MEMBER,
  INITIATE_REFUNDING_MEMBER,
  FETCH_MASTER_REPORTS_DATES,

  TOGGLE_TRANSFERRING_MEMBER,
  TRANSFER_MEMBER
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

/* Fetch Dentist Reports
 * ------------------------------------------------------ */
export function fetchDentistReports (dentistId) {
  return {
    type: FETCH_DENTIST_REPORTS_REQUEST,
    dentistId,
  };
}

export function fetchDentistReportsSuccess (payload) {
  return {
    type: FETCH_DENTIST_REPORTS_SUCCESS,
    payload,
  };
}

export function fetchDentistReportsError (payload) {
  return {
    type: FETCH_DENTIST_REPORTS_ERROR,
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

export function setEditingDentistId (dentistId) {
  return {
    type: SET_EDITING_DENTIST_ID,
    dentistId,
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

/* Edit Dentist
 * ------------------------------------------------------ */
export function editDentist (selectedDentist, values) {
  return {
    type: EDIT_DENTIST_REQUEST,
    selectedDentist,
    values
  };
}

export function editDentistSuccess (payload) {
  return {
    type: EDIT_DENTIST_SUCCESS,
    payload,
  };
}

export function editDentistError (payload) {
  return {
    type: EDIT_DENTIST_ERROR,
    payload
  };
}

/* Download Report
 * ------------------------------------------------------ */
export function downloadReport (reportName, reportUrl) {
  return {
    type: DOWNLOAD_REPORT_REQUEST,
    reportName,
    reportUrl,
  };
}

export function downloadReportSuccess () {
  return {
    type: DOWNLOAD_REPORT_SUCCESS,
  };
}

export function downloadReportFailure (payload) {
  return {
    type: DOWNLOAD_REPORT_ERROR,
    payload,
  };
}

/* Download Master Report
 * ------------------------------------------------------ */
export function downloadMasterReport (year, month) {
  return {
    type: DOWNLOAD_MASTER_REPORT_REQUEST,
    year,
    month,
  };
}

export function downloadMasterReportSuccess () {
  return {
    type: DOWNLOAD_MASTER_REPORT_SUCCESS,
  };
}

export function downloadMasterReportFailure (payload) {
  return {
    type: DOWNLOAD_MASTER_REPORT_ERROR,
    payload,
  };
}

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

// Managers
export function fetchManagers () {
  return {
    type: FETCH_MANAGERS_REQUEST,
  };
}

export function toggleRefundingMember (value) {
  return {
    type: TOGGLE_REFUNDING_MEMBER,
    payload: value
  };
}

export function initiateRefundingMember (id, amount) {
  return {
    type: INITIATE_REFUNDING_MEMBER,
    id,
    amount,
  };
}

export function fetchMasterReportsDates () {
  return {
    type: FETCH_MASTER_REPORTS_DATES,
  };
}

export function toggleTransferringMember (memberId) {
  return {
    type: TOGGLE_TRANSFERRING_MEMBER,
    memberId
  };
}

export function transferMember (memberId, shouldChargeReEnrollmentFree) {
  return {
    type: TRANSFER_MEMBER,
    memberId,
    shouldChargeReEnrollmentFree
  };
}
