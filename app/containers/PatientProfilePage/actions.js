/*
Patient Profile Page Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // fetch dentist
  DENTIST_REQUEST,
  DENTIST_SUCCESS,
  DENTIST_ERROR,

  // fetch members
  FAMILY_MEMBERS_REQUEST,
  FAMILY_MEMBERS_SUCCESS,
  FAMILY_MEMBERS_ERROR,

  // add / edit member
  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  SUBMIT_MEMBER_FORM,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  // remove member
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,

  // add / edit review
  // TODO: edit
  SET_EDITING_REVIEW,
  CLEAR_EDITING_REVIEW,
  SUBMIT_REVIEW_FORM,
  SEND_REVIEW_SUCCESS,

  // remove review
  // TODO
} from './constants';

/*
Fetch Dentist
------------------------------------------------------------
*/
export function fetchDentist() {
  return {
    type: DENTIST_REQUEST,
  };
}

export function setDentist (payload) {
  return {
    type: DENTIST_SUCCESS,
    payload,
  };
}

export function setDentistErrors (payload) {
  return {
    type: DENTIST_ERROR,
    payload,
  };
}

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
Add / Edit Member
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

/*
Remove Member 
------------------------------------------------------------
*/
export function setRemovingMember (payload, userId) {
  return {
    type: REMOVE_MEMBER_REQUEST,
    payload,
    userId,
  };
}

export function setRemovedMember (memberId, userId) {
  return {
    type: REMOVE_MEMBER_SUCCESS,
    memberId,
    userId,
  }
}

/*
Add / Edit Review
------------------------------------------------------------
TODO: edit review
*/
export function setEditingReview (review) {
  return {
    type: SET_EDITING_REVIEW,
    review,
  };
}

export function clearEditingReview (review) {
  return {
    type: CLEAR_EDITING_REVIEW,
  };
}

export function submitReviewForm (payload, dentistId) {
  return {
    type: SUBMIT_REVIEW_FORM,
    payload,
    dentistId,
  };
}

export function setSentReview (payload, dentistId) {
  return {
    type: SEND_REVIEW_SUCCESS,
    payload,
    dentistId,
  };
}

/*
Remove Review
------------------------------------------------------------
TODO
*/
