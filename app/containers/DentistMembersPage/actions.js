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
Members
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
