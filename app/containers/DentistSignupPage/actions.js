import {
  DENTIST_SIGNUP_REQUEST,
  DENTIST_SIGNUP_SUCCESS,
  DENTIST_SIGNUP_ERROR
} from './constants';

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
