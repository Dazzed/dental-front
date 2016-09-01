import {
  ACTIVATE_REQUEST,
  ACTIVATE_SUCCESS,
  ACTIVATE_ERROR
} from './constants';

export function activateRequest (payload) {
  return {
    type: ACTIVATE_REQUEST,
    payload,
  };
}

export function activateSuccess () {
  return {
    type: ACTIVATE_SUCCESS,
  };
}

export function activateError (payload) {
  return {
    type: ACTIVATE_ERROR,
    payload,
  };
}
