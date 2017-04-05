/*
Learn More Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // send contact us message
  SET_EDITING_CONTACT_US_MESSAGE,
  CLEAR_EDITING_CONTACT_US_MESSAGE,
  SUBMIT_CONTACT_US_MESSAGE_FORM,
  SEND_CONTACT_US_MESSAGE_SUCCESS,
} from './constants';

/*
Send Contact Us Message
------------------------------------------------------------
*/
export function setContactUsMessage (message) {
  return {
    type: SET_EDITING_CONTACT_US_MESSAGE,
    message,
  };
}

export function clearContactUsMessage () {
  return {
    type: CLEAR_EDITING_CONTACT_US_MESSAGE,
  };
}

export function submitContactUsForm (payload) {
  return {
    type: SUBMIT_CONTACT_US_MESSAGE_FORM,
    payload,
  };
}

export function sentContactUsMessage () {
  return {
    type: SEND_CONTACT_US_MESSAGE_SUCCESS,
  };
}
