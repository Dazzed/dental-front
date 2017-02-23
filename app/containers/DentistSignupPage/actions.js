/*
Patient Signup Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // fetch
  DENTIST_SPECIALTIES_REQUEST,
  DENTIST_SPECIALTIES_SUCCESS,
  DENTIST_SPECIALTIES_ERROR,

  // signup
  DENTIST_SIGNUP_REQUEST,
  DENTIST_SIGNUP_SUCCESS,
  DENTIST_SIGNUP_ERROR,
  DENTIST_CLEAR_SIGNUP_STATUS,
} from './constants';


/*
Fetch Actions
================================================================================
*/
export function dentistSpecialtiesRequest (payload) {
  return {
    type: DENTIST_SPECIALTIES_REQUEST,
    payload
  };
}

export function dentistSpecialtiesSuccess (payload) {
  return {
    type: DENTIST_SPECIALTIES_SUCCESS,
    payload
  };
}

export function dentistSpecialtiesError (payload) {
  return {
    type: DENTIST_SPECIALTIES_ERROR,
    payload
  };
}


/*
Signup Actions
================================================================================
*/
export function signupRequest (payload) {
  return {
    type: DENTIST_SIGNUP_REQUEST,
    payload
  };
}

export function signupSuccess (payload) {
  return {
    type: DENTIST_SIGNUP_SUCCESS,
    payload
  };
}

export function signupError (payload) {
  return {
    type: DENTIST_SIGNUP_ERROR,
    payload
  };
}

export function clearSignupStatus () {
  return {
    type: CLEAR_SIGNUP_STATUS,
  };
}
