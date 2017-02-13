/*
Signup Page Actions
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

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,

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
Login Actions
================================================================================
*/
export function loginRequest (payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess (token) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
    },
  };
}

export function loginError (payload) {
  return {
    type: LOGIN_ERROR,
    payload,
  };
}

export function logout () {
  return {
    type: LOGOUT,
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
