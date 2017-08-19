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

  // edit payment info
  SET_EDITING_PAYMENT,
  CLEAR_EDITING_PAYMENT,
  SUBMIT_PAYMENT_FORM,

  // cancel membership
  MEMBERSHIP_CANCEL_REQUEST
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


/*
Cancel Membership
------------------------------------------------------------
*/
export function cancelMembership() {
  return {
    type: MEMBERSHIP_CANCEL_REQUEST,
  };
}

export function setDentist(payload) {
  return {
    type: DENTIST_SUCCESS,
    payload,
  };
}

export function setDentistErrors(payload) {
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

export function setFamilyMembers(payload) {
  return {
    type: FAMILY_MEMBERS_SUCCESS,
    payload,
  };
}

export function setFamilyMembersErrors(payload) {
  return {
    type: FAMILY_MEMBERS_ERROR,
    payload,
  };
}

/*
Add / Edit Member
------------------------------------------------------------
*/
export function setEditingMember(patient, member, callback) {
  return {
    type: SET_EDITING_MEMBER,
    patient,
    member,
    callback
  };
}

export function clearEditingMember() {
  return {
    type: CLEAR_EDITING_MEMBER,
  };
}

export function submitMemberForm(patient, payload) {
  if (payload.clientSubscription) {
    if (payload.clientSubscription.status !== 'active') {
      payload.isEnrolling = true;
    } else {
      payload.isEnrolling = false;
    }
  } else {
    payload.isEnrolling = false;
  }
  return {
    type: SUBMIT_MEMBER_FORM,
    patient,
    payload,
  };
}

export function setAddedMember(patient, payload) {
  return {
    type: ADD_MEMBER_SUCCESS,
    patient,
    payload,
  };
}

export function setEditedMember(patient, payload) {
  return {
    type: EDIT_MEMBER_SUCCESS,
    patient,
    payload,
  };
}

/*
Remove Member
------------------------------------------------------------
*/
export function setRemovingMember(patient, payload, dentistId) {
  return {
    type: REMOVE_MEMBER_REQUEST,
    patient,
    payload,
    dentistId
  };
}

export function setRemovedMember(patient, memberId) {
  return {
    type: REMOVE_MEMBER_SUCCESS,
    patient,
    memberId,
  }
}

/*
Edit Profile
------------------------------------------------------------
*/
export function setEditingProfile(user) {
  return {
    type: SET_EDITING_PROFILE,
    user,
  };
}

export function clearEditingProfile() {
  return {
    type: CLEAR_EDITING_PROFILE,
  };
}

export function submitProfileForm(payload, userId) {
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
export function setEditingReview(review) {
  return {
    type: SET_EDITING_REVIEW,
    review,
  };
}

export function clearEditingReview(review) {
  return {
    type: CLEAR_EDITING_REVIEW,
  };
}

export function submitReviewForm(payload, dentistId) {
  return {
    type: SUBMIT_REVIEW_FORM,
    payload,
    dentistId,
  };
}

export function setAddedReview(payload, dentistId) {
  return {
    type: ADD_REVIEW_SUCCESS,
    payload,
    dentistId,
  };
}

export function setEditedReview(payload, dentistId) {
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
export function setRemovingReview(payload, dentistId) {
  return {
    type: REMOVE_REVIEW_REQUEST,
    payload,
    dentistId,
  };
}

export function setRemovedReview(reviewId, dentistId) {
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
export function setEditingSecurity(securityInfo) {
  return {
    type: SET_EDITING_SECURITY,
    securityInfo,
  };
}

export function clearEditingSecurity() {
  return {
    type: CLEAR_EDITING_SECURITY,
  };
}

export function submitSecurityForm(payload, user) {
  return {
    type: SUBMIT_SECURITY_FORM,
    payload,
    user,
  };
}

// update user data at App level, see setUserData in `/app/containers/App/actions.js`

/* Edit Payment Info
 * ------------------------------------------------------ */
export function setEditingPayment(user) {
  return {
    type: SET_EDITING_PAYMENT,
    user
  };
}

export function clearEditingPayment() {
  return {
    type: CLEAR_EDITING_PAYMENT,
  };
}

export function submitPaymentForm(payload, user) {
  return {
    type: SUBMIT_PAYMENT_FORM,
    payload,
    user,
  };
}

// don't store payment info locally
