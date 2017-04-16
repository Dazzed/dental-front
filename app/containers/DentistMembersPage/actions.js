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

  // fetch patients
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,

  // search / sort patients
  SEARCH_MEMBERS,
  SORT_MEMBERS,

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
} from './constants';

/*
Fetch Dentist Info
------------------------------------------------------------
*/
export function fetchDentistInfo () {
  return {
    type: FETCH_DENTIST_INFO_REQUEST,
  };
}

export function fetchDentistInfoSuccess (payload) {
  return {
    type: FETCH_DENTIST_INFO_SUCCESS,
    payload,
  };
}

export function fetchDentistInfoError (payload) {
  return {
    type: FETCH_DENTIST_INFO_ERROR,
    payload,
  };
}

/*
Fetch Patients
------------------------------------------------------------
*/
export function fetchPatients () {
  return {
    type: FETCH_PATIENTS_REQUEST,
  };
}

export function fetchPatientsSuccess (payload) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload,
  };
}

export function fetchPatientsError (payload) {
  return {
    type: FETCH_PATIENTS_ERROR,
    payload,
  };
}

/*
Search / Sort Patients
------------------------------------------------------------
*/
export function searchMembers (name) {
  return {
    type: SEARCH_MEMBERS,
    name,
  };
}

export function sortMembers (status) {
  return {
    type: SORT_MEMBERS,
    status,
  };
}

/*
Add / Edit Member
------------------------------------------------------------
*/
export function setEditingMember (patient, member) {
  return {
    type: SET_EDITING_MEMBER,
    patient,
    member,
  };
}

export function clearEditingMember () {
  return {
    type: CLEAR_EDITING_MEMBER,
  };
}

export function submitMemberForm (patient, payload) {
  return {
    type: SUBMIT_MEMBER_FORM,
    patient,
    payload,
  };
}

export function setAddedMember (patient, payload) {
  return {
    type: ADD_MEMBER_SUCCESS,
    patient,
    payload,
  };
}

export function setEditedMember (patient, payload) {
  return {
    type: EDIT_MEMBER_SUCCESS,
    patient,
    payload,
  };
}

/*
Remove Member
------------------------------------------------------------
*/
 export function setRemovingMember (patient, payload) {
  return {
    type: REMOVE_MEMBER_REQUEST,
    patient,
    payload,
  };
}

export function setRemovedMember (patient, memberId) {
  return {
    type: REMOVE_MEMBER_SUCCESS,
    patient,
    memberId,
  }
}

/*
Edit Patient Profile
------------------------------------------------------------
*/
export function setEditingPatientProfile (patient) {
  return {
    type: SET_EDITING_PATIENT_PROFILE,
    patient,
  };
}

export function clearEditingPatientProfile () {
  return {
    type: CLEAR_EDITING_PATIENT_PROFILE,
  };
}

export function submitPatientProfileForm (payload) {
  return {
    type: SUBMIT_PATIENT_PROFILE_FORM,
    payload,
  };
}

export function setEditedPatientProfile (payload) {
  return {
    type: EDIT_PATIENT_PROFILE_SUCCESS,
    payload,
  };
}

/* Edit Payment Info
 * ------------------------------------------------------ */
export function setEditingPatientPayment (patient, paymentInfo) {
  return {
    type: SET_EDITING_PATIENT_PAYMENT,
    patient,
    paymentInfo,
  };
}

export function clearEditingPatientPayment () {
  return {
    type: CLEAR_EDITING_PATIENT_PAYMENT,
  };
}

export function submitPatientPaymentForm (patient, payload) {
  return {
    type: SUBMIT_PATIENT_PAYMENT_FORM,
    patient,
    payload,
  };
}

// don't store payment info locally
