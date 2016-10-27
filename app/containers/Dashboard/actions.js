/*
 *
 * Dashboard actions
 *
 */

import {
  MY_DENTIST_REQUEST,
  MY_DENTIST_SUCCESS,
  MY_DENTIST_ERROR,
  MY_FAMILY_REQUEST,
  MY_FAMILY_SUCCESS,
  MY_FAMILY_ERROR,
  MY_PATIENTS_REQUEST,
  MY_PATIENTS_SUCCESS,
  MY_PATIENTS_ERROR,
  CONVERSATION_REQUEST,
  CONVERSATION_SUCCESS,
  CONVERSATION_ERROR,
  SUBMIT_MESSAGE_FORM,
  SUBMIT_CLIENT_REVIEW_FORM,
  SUBMIT_INVITE_PATIENT_FORM,
} from 'containers/Dashboard/constants';

export function fetchMyDentist () {
  return {
    type: MY_DENTIST_REQUEST,
  };
}

export function myDentistFetched (payload) {
  return {
    type: MY_DENTIST_SUCCESS,
    payload,
  };
}

export function myDentistFetchingError (payload) {
  return {
    type: MY_DENTIST_ERROR,
    payload,
  };
}

export function fetchMyFamily () {
  return {
    type: MY_FAMILY_REQUEST,
  };
}

export function myFamilyFetched (payload) {
  return {
    type: MY_FAMILY_SUCCESS,
    payload,
  };
}

export function myFamilyFetchingError (payload) {
  return {
    type: MY_FAMILY_ERROR,
    payload,
  };
}


export function fetchMyPatients () {
  return {
    type: MY_PATIENTS_REQUEST,
  };
}

export function myPatientsFetched (payload) {
  return {
    type: MY_PATIENTS_SUCCESS,
    payload,
  };
}

export function myPatientsFetchingError (payload) {
  return {
    type: MY_PATIENTS_ERROR,
    payload,
  };
}

export function fetchConversation (payload) {
  return {
    type: CONVERSATION_REQUEST,
    payload,
  };
}

export function conversationFetched (payload) {
  return {
    type: CONVERSATION_SUCCESS,
    payload,
  };
}

export function conversationFetchingError (payload) {
  return {
    type: CONVERSATION_ERROR,
    payload,
  };
}

export function submitMessageForm (payload) {
  return {
    type: SUBMIT_MESSAGE_FORM,
    payload,
  };
}

export function submitClientReviewForm (payload) {
  return {
    type: SUBMIT_CLIENT_REVIEW_FORM,
    payload,
  };
}

export function submitInvitePatientForm (payload) {
  return {
    type: SUBMIT_INVITE_PATIENT_FORM,
    payload,
  };
}
