import {
  SUBMIT_CONTACT_SUPPORT,
  SUBMIT_CONTACT_SUPPORT_SUCCESS,
  SUBMIT_CONTACT_SUPPORT_ERROR,
} from './constants';

export function submitContactSupportForm (payload) {
  return {
    type: SUBMIT_CONTACT_SUPPORT,
    payload,
  };
}

export function submitContactSupportFormSuccess () {
  return {
    type: SUBMIT_CONTACT_SUPPORT_SUCCESS,
  };
}

export function submitContactSupportFormError () {
  return {
    type: SUBMIT_CONTACT_SUPPORT_ERROR,
  };
}
