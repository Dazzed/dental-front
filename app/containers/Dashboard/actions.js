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
  NEW_MSG_COUNT_REQUEST,
  NEW_MSG_COUNT_SUCCESS,
  MARK_MSG_READ_REQUEST,
  SUBMIT_MESSAGE_FORM,
  SUBMIT_CLIENT_REVIEW_FORM,
  SUBMIT_INVITE_PATIENT_FORM,
  SET_EDITING_MEMBER,
  SUBMIT_MEMBER_FORM,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  REQUEST_PAYMENT_BILL,
  SET_PAYMENT_BILL,
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

export function fetchNewMsgCount (payload) {
  return {
    type: NEW_MSG_COUNT_REQUEST,
    payload,
  };
}

export function newMsgCountFetched (payload) {
  return {
    type: NEW_MSG_COUNT_SUCCESS,
    payload,
  };
}

export function markMsgRead (payload) {
  return {
    type: MARK_MSG_READ_REQUEST,
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

export function setEditingMember (payload, userId) {
  return {
    type: SET_EDITING_MEMBER,
    payload,
    userId,
  };
}


export function submitMemberForm (payload, userId) {
  return {
    type: SUBMIT_MEMBER_FORM,
    payload,
    userId,
  };
}

export function memberAdded (payload, userId) {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload,
    userId,
  };
}

export function memberEdited (payload, userId) {
  return {
    type: EDIT_MEMBER_SUCCESS,
    payload,
    userId,
  };
}

export function deleteMember (payload, userId) {
  return {
    type: DELETE_MEMBER_REQUEST,
    payload,
    userId,
  };
}

export function memberDeleted (memberId, userId) {
  return {
    type: DELETE_MEMBER_SUCCESS,
    memberId,
    userId,
  };
}


export function requestPayBill (payload, userId) {
  return {
    type: REQUEST_PAYMENT_BILL,
    payload,
    userId,
  };
}


export function setBill (userId) {
  return {
    type: SET_PAYMENT_BILL,
    userId,
  };
}
