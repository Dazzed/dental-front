/*
Login Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
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

