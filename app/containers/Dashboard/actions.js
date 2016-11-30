/*
 *
 * Dashboard actions
 *
 */

import {
  MY_DENTIST_REQUEST,
  MY_DENTIST_SUCCESS,
  MY_DENTIST_ERROR,

  MY_MEMBERS_REQUEST,
  MY_MEMBERS_SUCCESS,
  MY_MEMBERS_ERROR,

  MY_PATIENTS_REQUEST,
  MY_PATIENTS_SUCCESS,
  MY_PATIENTS_ERROR,

  CONVERSATION_REQUEST,
  CONVERSATION_SUCCESS,
  CONVERSATION_ERROR,

  MESSAGE_SENT,
  NEW_MSG_COUNT_REQUEST,
  NEW_MSG_COUNT_SUCCESS,

  MARK_MSG_READ_REQUEST,

  SUBMIT_MESSAGE_FORM,
  SUBMIT_CLIENT_REVIEW_FORM,
  SUBMIT_INVITE_PATIENT_FORM,

  SUBMIT_MEMBER_FORM,

  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,

  REQUEST_PAYMENT_BILL,
  SET_PAYMENT_BILL,
  REQUEST_REPORT,
} from 'containers/Dashboard/constants';


export function fetchMyDentist () {
  return {
    type: MY_DENTIST_REQUEST,
  };
}

export function setMyDentist (payload) {
  return {
    type: MY_DENTIST_SUCCESS,
    payload,
  };
}

export function setMyDentistErrors (payload) {
  return {
    type: MY_DENTIST_ERROR,
    payload,
  };
}

export function fetchMyMembers () {
  return {
    type: MY_MEMBERS_REQUEST,
  };
}

export function setMyMembers (payload) {
  return {
    type: MY_MEMBERS_SUCCESS,
    payload,
  };
}

export function setMemberErrors (payload) {
  return {
    type: MY_MEMBERS_ERROR,
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

export function messageSent (payload) {
  return {
    type: MESSAGE_SENT,
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

// TODO: Delete this after migration to new user schema is done
export function setEditingMember (payload, userId) {
  return {
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


export function requestReport () {
  return {
    type: REQUEST_REPORT,
  };
}
