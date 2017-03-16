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
  FETCH_OFFICES_REQUEST,
  FETCH_OFFICES_SUCCESS,
  FETCH_OFFICES_ERROR,

  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_STATUS,
} from './constants';


/*
Fetch Actions
================================================================================
*/
export function fetchOffices () {
  return {
    type: FETCH_OFFICES_REQUEST,
  };
}

export function fetchOfficesSuccess (payload) {
  return {
    type: FETCH_OFFICES_SUCCESS,
    payload,
  };
}

export function fetchOfficesError (payload) {
  return {
    type: FETCH_OFFICES_ERROR,
    payload,
  };
}


/*
Signup Actions
================================================================================
*/
export function signupRequest (payload) {
  return {
    type: SIGNUP_REQUEST,
    payload
  };
}

export function signupSuccess (payload) {
  return {
    type: SIGNUP_SUCCESS,
    payload
  };
}

export function signupError (payload) {
  return {
    type: SIGNUP_ERROR,
    payload
  };
}

export function clearSignupStatus () {
  return {
    type: CLEAR_SIGNUP_STATUS,
  };
}
