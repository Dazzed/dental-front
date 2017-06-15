/*
Forgot Password Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_AUTH_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  LOGOUT,
} from './constants';


/*
Forgot Password Actions
================================================================================
*/
export function passwordResetRequest(payload) {
  return {
    type: PASSWORD_RESET_REQUEST,
    payload,
  };
}

export function passwordResetAuth(payload) {
  return {
    type: PASSWORD_RESET_REQUEST,
    payload,
  };
}

export function passwordResetSuccess(message) {
  return {
    type: PASSWORD_RESET_SUCCESS,
    payload: {
      message,
    },
  };
}

export function passwordResetError(payload) {
  return {
    type: PASSWORD_RESET_ERROR,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
