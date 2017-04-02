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

  // edit profile
  SET_EDITING_PROFILE,
  CLEAR_EDITING_PROFILE,
  SUBMIT_PROFILE_FORM,

  // add / edit review
  SET_EDITING_REVIEW,
  CLEAR_EDITING_REVIEW,
  SUBMIT_REVIEW_FORM,
  ADD_REVIEW_SUCCESS,
  EDIT_REVIEW_SUCCESS,

  // remove review
  REMOVE_REVIEW_REQUEST,
  REMOVE_REVIEW_SUCCESS,

  // edit security
  SET_EDITING_SECURITY,
  CLEAR_EDITING_SECURITY,
  SUBMIT_SECURITY_FORM,
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
Edit Profile
------------------------------------------------------------
*/
export function setEditingProfile (user) {
  return {
    type: SET_EDITING_PROFILE,
    user,
  };
}

export function clearEditingProfile () {
  return {
    type: CLEAR_EDITING_PROFILE,
  };
}

export function submitProfileForm (payload, userId) {
  return {
    type: SUBMIT_PROFILE_FORM,
    payload,
    userId,
  };
}

// update user data at App level, see setUserData in `/app/containers/App/actions.js`

/*
Add / Edit Review
------------------------------------------------------------
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

export function setAddedReview (payload, dentistId) {
  return {
    type: ADD_REVIEW_SUCCESS,
    payload,
    dentistId,
  };
}

export function setEditedReview (payload, dentistId) {
  return {
    type: EDIT_REVIEW_SUCCESS,
    payload,
    dentistId,
  };
}

/*
Remove Review
------------------------------------------------------------
*/
export function setRemovingReview (payload, dentistId) {
  return {
    type: REMOVE_REVIEW_REQUEST,
    payload,
    dentistId,
  };
}

export function setRemovedReview (reviewId, dentistId) {
  return {
    type: REMOVE_REVIEW_SUCCESS,
    reviewId,
    dentistId,
  }
}

/*
Edit Security
------------------------------------------------------------
*/
export function setEditingSecurity (user) {
  return {
    type: SET_EDITING_SECURITY,
    user,
  };
}

export function clearEditingSecurity () {
  return {
    type: CLEAR_EDITING_SECURITY,
  };
}

export function submitSecurityForm (payload, userId) {
  return {
    type: SUBMIT_SECURITY_FORM,
    payload,
    userId,
  };
}

// update user data at App level, see setUserData in `/app/containers/App/actions.js`
