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
