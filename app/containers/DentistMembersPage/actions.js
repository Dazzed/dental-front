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
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,

  SEARCH_MEMBERS,
  SORT_MEMBERS,

  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  SUBMIT_MEMBER_FORM,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
} from './constants';

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
