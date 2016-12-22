import {
  FINAL_SIGNUP_REQUEST,
  FINAL_SIGNUP_SUCCESS,
  FINAL_SIGNUP_ERROR,
  CLEAR_FINAL_SIGNUP_STATUS,

  FETCH_OFFICES_REQUEST,
  FETCH_OFFICES_SUCCESS,
} from './constants';

export function finalSignupRequest (payload) {
  return {
    type: FINAL_SIGNUP_REQUEST,
    payload
  };
}

export function finalSignupSuccess (payload) {
  return {
    type: FINAL_SIGNUP_SUCCESS,
    payload
  };
}

export function finalSignupError (payload) {
  return {
    type: FINAL_SIGNUP_ERROR,
    payload
  };
}

export function clearFinalSignupStatus () {
  return {
    type: CLEAR_FINAL_SIGNUP_STATUS,
  };
}

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
