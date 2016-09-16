/*
 *
 * MyFamilyMembers actions
 *
 */

import {
  SUBMIT_MEMBER_FORM,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,

  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
} from './constants';

export function submitMemberForm (payload) {
  return {
    type: SUBMIT_MEMBER_FORM,
    payload,
  };
}

export function memberAdded (payload) {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload,
  };
}

export function memberEdited (payload) {
  return {
    type: EDIT_MEMBER_SUCCESS,
    payload,
  };
}

export function deleteMember (payload) {
  return {
    type: DELETE_MEMBER_REQUEST,
    payload,
  };
}

export function memberDeleted (memberId) {
  return {
    type: DELETE_MEMBER_SUCCESS,
    memberId,
  };
}

// Used to initialize form with the selected family member details
export function setEditingMember (memberId) {
  return {
    type: SET_EDITING_MEMBER,
    memberId,
  };
}

export function clearEditingMember () {
  return {
    type: CLEAR_EDITING_MEMBER,
  };
}
