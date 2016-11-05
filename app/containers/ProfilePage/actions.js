import {
  SUBMIT_PROFILE_FORM,
  SUBMIT_PROFILE_FORM_SUCCESS,
  SUBMIT_PROFILE_FORM_ERROR,
  FETCH_PROFILE_DATA,
} from './constants';

export function submitProfileForm (payload) {
  return {
    type: SUBMIT_PROFILE_FORM,
    payload,
  };
}

export function submitProfileFormSucess () {
  return {
    type: SUBMIT_PROFILE_FORM_SUCCESS,
  };
}

export function submitProfileFormError () {
  return {
    type: SUBMIT_PROFILE_FORM_ERROR,
  };
}

export function fetchProfileData () {
  return {
    type: FETCH_PROFILE_DATA,
  }
}
