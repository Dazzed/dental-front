/*
Patient Signup Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // fetch
  DENTIST_SPECIALTIES_REQUEST,
  DENTIST_SPECIALTIES_SUCCESS,
  DENTIST_SPECIALTIES_ERROR,

  PRICING_CODES_REQUEST,
  PRICING_CODES_SUCCESS,
  PRICING_CODES_ERROR,

  // image upload
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,

  // signup
  DENTIST_SIGNUP_REQUEST,
  DENTIST_SIGNUP_SUCCESS,
  DENTIST_SIGNUP_ERROR,
  CLEAR_DENTIST_SIGNUP_STATUS,
} from './constants';


/*
Fetch Actions
================================================================================
*/
export function dentistSpecialtiesRequest (payload) {
  return {
    type: DENTIST_SPECIALTIES_REQUEST,
    payload
  };
}

export function dentistSpecialtiesSuccess (payload) {
  return {
    type: DENTIST_SPECIALTIES_SUCCESS,
    payload
  };
}

export function dentistSpecialtiesError (payload) {
  return {
    type: DENTIST_SPECIALTIES_ERROR,
    payload
  };
}

export function pricingCodesRequest (payload) {
  return {
    type: PRICING_CODES_REQUEST,
    payload
  };
}

export function pricingCodesSuccess (payload) {
  return {
    type: PRICING_CODES_SUCCESS,
    payload
  };
}

export function pricingCodesError (payload) {
  return {
    type: PRICING_CODES_ERROR,
    payload
  };
}


/*
Image Upload Actions
================================================================================
*/
export function uploadImageRequest (field, file) {
  return {
    type: UPLOAD_IMAGE_REQUEST,
    field,
    file,
  };
}

export function uploadImageSuccess (url) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    url,
  };
}


/*
Signup Actions
================================================================================
*/
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

export function clearSignupStatus () {
  return {
    type: CLEAR_DENTIST_SIGNUP_STATUS,
  };
}
