import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_STATUS,
} from './constants';

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
