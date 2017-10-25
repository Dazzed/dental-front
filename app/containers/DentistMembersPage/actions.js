/*
Dentist Members Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // fetch dentist
  FETCH_DENTIST_INFO_REQUEST,
  FETCH_DENTIST_INFO_SUCCESS,
  FETCH_DENTIST_INFO_ERROR,

  // fetch dentist specialties
  DENTIST_SPECIALTIES_REQUEST,
  DENTIST_SPECIALTIES_SUCCESS,
  DENTIST_SPECIALTIES_ERROR,

  // fetch patients
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,

  // fetch reports
  FETCH_DENTIST_REPORTS_REQUEST,
  FETCH_DENTIST_REPORTS_SUCCESS,
  FETCH_DENTIST_REPORTS_ERROR,

  // search / filter patients
  SEARCH_MEMBERS,
  FILTER_MEMBERS,

  // add / edit member
  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  SUBMIT_MEMBER_FORM,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  // remove member
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,

  // edit patient profile
  SET_EDITING_PATIENT_PROFILE,
  CLEAR_EDITING_PATIENT_PROFILE,
  SUBMIT_PATIENT_PROFILE_FORM,
  EDIT_PATIENT_PROFILE_SUCCESS,

  // edit patient payment info
  SET_EDITING_PATIENT_PAYMENT,
  CLEAR_EDITING_PATIENT_PAYMENT,
  SUBMIT_PATIENT_PAYMENT_FORM,

  // toggle waive patient fees
  TOGGLE_WAIVE_PATIENT_FEES_REQUEST,
  TOGGLE_WAIVE_PATIENT_FEES_SUCCESS,

  // download report
  DOWNLOAD_REPORT_REQUEST,
  DOWNLOAD_REPORT_SUCCESS,
  DOWNLOAD_REPORT_ERROR,

  // image upload
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,

  // signup
  DENTIST_SIGNUP_REQUEST,
  DENTIST_SIGNUP_SUCCESS,
  DENTIST_SIGNUP_ERROR,

  // edit security
  SET_EDITING_SECURITY,
  CLEAR_EDITING_SECURITY,
  SUBMIT_SECURITY_FORM,

  // images deletion.
  DELETE_OFFICE_LOGO,
  DELETE_DENTIST_AVATAR,
  DELETE_DENTIST_OFFICE_IMAGE,

  // custom memberships
  ADD_CUSTOM_MEMBERSHIP,
  EDIT_CUSTOM_MEMBERSHIP,
  DELETE_CUSTOM_MEMBERSHIP

} from './constants';

/*
Fetch Dentist Info
------------------------------------------------------------
*/
export function fetchDentistInfo() {
  return {
    type: FETCH_DENTIST_INFO_REQUEST,
  };
}

export function fetchDentistInfoSuccess(payload) {
  return {
    type: FETCH_DENTIST_INFO_SUCCESS,
    payload,
  };
}

export function fetchDentistInfoError(payload) {
  return {
    type: FETCH_DENTIST_INFO_ERROR,
    payload,
  };
}

/* Fetch Dentist Specialties
 * ------------------------------------------------------ */
export function dentistSpecialtiesRequest(payload) {
  return {
    type: DENTIST_SPECIALTIES_REQUEST,
    payload
  };
}

export function dentistSpecialtiesSuccess(payload) {
  return {
    type: DENTIST_SPECIALTIES_SUCCESS,
    payload
  };
}

export function dentistSpecialtiesError(payload) {
  return {
    type: DENTIST_SPECIALTIES_ERROR,
    payload
  };
}

/*
Fetch Patients
------------------------------------------------------------
*/
export function fetchPatients() {
  return {
    type: FETCH_PATIENTS_REQUEST,
  };
}

export function fetchPatientsSuccess(payload) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload,
  };
}

export function fetchPatientsError(payload) {
  return {
    type: FETCH_PATIENTS_ERROR,
    payload,
  };
}

/* Fetch Dentist Reports
 * ------------------------------------------------------ */
export function fetchDentistReports() {
  return {
    type: FETCH_DENTIST_REPORTS_REQUEST,
  };
}

export function fetchDentistReportsSuccess(payload) {
  return {
    type: FETCH_DENTIST_REPORTS_SUCCESS,
    payload,
  };
}

export function fetchDentistReportsError(payload) {
  return {
    type: FETCH_DENTIST_REPORTS_ERROR,
    payload,
  };
}

/*
Search / Filter Patients
------------------------------------------------------------
*/
export function searchMembers(name) {
  return {
    type: SEARCH_MEMBERS,
    name,
  };
}

export function filterMembers(status) {
  return {
    type: FILTER_MEMBERS,
    status,
  };
}

/*
Add / Edit Member
------------------------------------------------------------
*/
export function setEditingMember(patient, member, callback) {
  return {
    type: SET_EDITING_MEMBER,
    patient,
    member,
    callback
  };
}

export function clearEditingMember() {
  return {
    type: CLEAR_EDITING_MEMBER,
  };
}

export function submitMemberForm(patient, payload) {
  if (payload.subscription && payload.subscription.status !== 'active') {
    payload.isEnrolling = true;
  } else {
    payload.isEnrolling = false;
  }
  return {
    type: SUBMIT_MEMBER_FORM,
    patient,
    payload,
  };
}

export function setAddedMember(patient, payload) {
  return {
    type: ADD_MEMBER_SUCCESS,
    patient,
    payload,
  };
}

export function setEditedMember(patient, payload, subscription) {
  return {
    type: EDIT_MEMBER_SUCCESS,
    patient,
    payload,
    subscription,
  };
}

/*
Remove Member
------------------------------------------------------------
*/
export function setRemovingMember(patient, payload, dentistId) {
  return {
    type: REMOVE_MEMBER_REQUEST,
    patient,
    payload,
    dentistId
  };
}

export function setRemovedMember(patient, memberId, updatedSubscription) {
  return {
    type: REMOVE_MEMBER_SUCCESS,
    patient,
    memberId,
    updatedSubscription,
  }
}

/*
Edit Patient Profile
------------------------------------------------------------
*/
export function setEditingPatientProfile(patient) {
  return {
    type: SET_EDITING_PATIENT_PROFILE,
    patient,
  };
}

export function clearEditingPatientProfile() {
  return {
    type: CLEAR_EDITING_PATIENT_PROFILE,
  };
}

export function submitPatientProfileForm(payload) {
  return {
    type: SUBMIT_PATIENT_PROFILE_FORM,
    payload,
  };
}

export function setEditedPatientProfile(payload) {
  return {
    type: EDIT_PATIENT_PROFILE_SUCCESS,
    payload,
  };
}

/* Edit Payment Info
 * ------------------------------------------------------ */
export function setEditingPatientPayment(patient, paymentInfo) {
  return {
    type: SET_EDITING_PATIENT_PAYMENT,
    patient,
    paymentInfo,
  };
}

export function clearEditingPatientPayment() {
  return {
    type: CLEAR_EDITING_PATIENT_PAYMENT,
  };
}

export function submitPatientPaymentForm(patient, payload) {
  return {
    type: SUBMIT_PATIENT_PAYMENT_FORM,
    patient,
    payload,
  };
}

// don't store payment info locally

/*
Toggle Waive Patient Fees
------------------------------------------------------------
*/
export function setTogglingWaivePatientFees(patient, payload) {
  return {
    type: TOGGLE_WAIVE_PATIENT_FEES_REQUEST,
    patient,
    payload,
  };
}

export function setToggledWaivePatientFees(patient, payload) {
  return {
    type: TOGGLE_WAIVE_PATIENT_FEES_SUCCESS,
    patient,
    payload,
  }
}


/* Download Report
 * ------------------------------------------------------ */
export function downloadReport(reportName, reportUrl) {
  return {
    type: DOWNLOAD_REPORT_REQUEST,
    reportName,
    reportUrl,
  };
}

export function downloadReportSuccess() {
  return {
    type: DOWNLOAD_REPORT_SUCCESS,
  };
}

export function downloadReportFailure(payload) {
  return {
    type: DOWNLOAD_REPORT_ERROR,
    payload,
  };
}

/*
Image Upload Actions
------------------------------------------------------
*/
export function uploadImageRequest(field, file) {
  return {
    type: UPLOAD_IMAGE_REQUEST,
    field,
    file,
  };
}

export function uploadImageSuccess(url) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    url,
  };
}

/*
Signup Actions
------------------------------------------------------
*/
export function signupRequest(payload) {
  return {
    type: DENTIST_SIGNUP_REQUEST,
    payload
  };
}

export function signupSuccess(payload) {
  return {
    type: DENTIST_SIGNUP_SUCCESS,
    payload
  };
}

export function signupError(payload) {
  return {
    type: DENTIST_SIGNUP_ERROR,
    payload
  };
}

/*
Edit Security
------------------------------------------------------------
*/
export function setEditingSecurity(securityInfo) {
  return {
    type: SET_EDITING_SECURITY,
    securityInfo,
  };
}

export function clearEditingSecurity() {
  return {
    type: CLEAR_EDITING_SECURITY,
  };
}

export function submitSecurityForm(payload, user) {
  return {
    type: SUBMIT_SECURITY_FORM,
    payload,
    user,
  };
}

// images.

export function deleteOfficeLogo (dentistId, dentistInfoId) {
  return {
    type: DELETE_OFFICE_LOGO,
    dentistId,
    dentistInfoId
  };
}

export function deleteDentistAvatar (dentistId) {
  return {
    type: DELETE_DENTIST_AVATAR,
    dentistId
  };
}

export function deleteDentistOfficeImage (dentistId, dentistInfoId, dentistInfoPhotoId) {
  return {
    type: DELETE_DENTIST_OFFICE_IMAGE,
    dentistId,
    dentistInfoId,
    dentistInfoPhotoId
  };
}

export function addCustomMembership (membershipPlan) {
  return {
    type: ADD_CUSTOM_MEMBERSHIP,
    membershipPlan
  };
}

export function editCustomMembership (customMemberships) {
  return {
    type: EDIT_CUSTOM_MEMBERSHIP,
    customMemberships
  };
}

export function deleteCustomMembership (customMemberships) {
  return {
    type: DELETE_CUSTOM_MEMBERSHIP,
    customMemberships
  };
}
// update user data at App level, see setUserData in `/app/containers/App/actions.js`
