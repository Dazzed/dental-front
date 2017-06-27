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
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  LOGOUT,
} from './constants';


/*
Forgot Password Actions
================================================================================
*/
export function forgotPasswordRequest(payload) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload,
  };
}

export function forgotPasswordSuccess(message) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: {
      message,
    },
  };
}

export function forgotPasswordError(payload) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
