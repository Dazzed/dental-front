/*
Patient Family Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  FAMILY_MEMBERS_REQUEST,
  FAMILY_MEMBERS_SUCCESS,
  FAMILY_MEMBERS_ERROR,

  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  SUBMIT_MEMBER_FORM,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,
} from './constants';

/*
Fetch Family Members
------------------------------------------------------------
*/
export function fetchFamilyMembers() {
  return {
    type: FAMILY_MEMBERS_REQUEST,
  };
}

export function setFamilyMembers (payload) {
  return {
    type: FAMILY_MEMBERS_SUCCESS,
    payload,
  };
}

export function setFamilyMembersErrors (payload) {
  return {
    type: FAMILY_MEMBERS_ERROR,
    payload,
  };
}

/*
Member Form
------------------------------------------------------------
*/
export function setEditingMember (member) {
  return {
    type: SET_EDITING_MEMBER,
    member
  };
}

export function clearEditingMember () {
  return {
    type: CLEAR_EDITING_MEMBER,
  };
}

export function submitMemberForm (payload, userId) {
  return {
    type: SUBMIT_MEMBER_FORM,
    payload,
    userId,
  };
}

export function setAddedMember (payload, userId) {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload,
    userId,
  };
}

export function setEditedMember (payload, userId) {
  return {
    type: EDIT_MEMBER_SUCCESS,
    payload,
    userId,
  };
}
