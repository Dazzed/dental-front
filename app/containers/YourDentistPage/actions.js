/*
Patient Family Page Actions
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
