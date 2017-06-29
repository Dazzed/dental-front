/*
Patient Offsite Signup Page Actions
================================================================================
NOTE: Since all of these actions are performed before the user actually signs
up and creates an account, all data must be handled locally until the final
signup request.  That means that Actions normally handled by the page's Sagas,
such as SUBMIT_MEMBER_FORM, are instead handled by the reducer.  These Actions
will also not have a follow up Action, such as ADD_MEMBER_SUCCESS and
EDIT_MEMBER_SUCCESS.
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

  // update user
  SUBMIT_USER_FORM,

  // add / edit member
  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  SUBMIT_MEMBER_FORM,

  // remove member
  REMOVE_MEMBER_REQUEST,

  // checkout
  SET_EDITING_CHECKOUT,
  CLEAR_EDITING_CHECKOUT,
  SUBMIT_CHECKOUT_FORM,
  STRIPE_CREATE_TOKEN,

  // signup
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_STATUS,
} from './constants';
 
/*
Fetch Dentist
------------------------------------------------------------
*/
export function fetchDentist(dentistId) {
  return {
    type: DENTIST_REQUEST,
    dentistId,
  };
}

export function setDentist (dentist) {
  Stripe.setPublishableKey(dentist.stripe_public_key);
  return {
    type: DENTIST_SUCCESS,
    dentist,
  };
}

export function setDentistError (error) {
  return {
    type: DENTIST_ERROR,
    error,
  };
}

/*
Update User
------------------------------------------------------------
*/
export function submitUserForm (user) {
  return {
    type: SUBMIT_USER_FORM,
    user,
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

export function submitMemberForm (member) {
  return {
    type: SUBMIT_MEMBER_FORM,
    member,
  };
}

/*
Remove Member 
------------------------------------------------------------
*/
export function setRemovingMember (memberId) {
  return {
    type: REMOVE_MEMBER_REQUEST,
    memberId,
  };
}

/*
Checkout
------------------------------------------------------------
*/

export function createStripeToken(cardDetails,user,paymentInfo) {
  return {
    type: STRIPE_CREATE_TOKEN,
    cardDetails,
    user,
    paymentInfo
  }
}

export function setEditingCheckout (cardDetails) {
  return {
    type: SET_EDITING_CHECKOUT,
    cardDetails,
  };
}

export function clearEditingCheckout () {
  return {
    type: CLEAR_EDITING_CHECKOUT,
  };
}

// submitting the checkout form triggers the Signup process.

/*
Signup
------------------------------------------------------------
*/
export function signupRequest (user, paymentInfo) {
  return {
    type: SIGNUP_REQUEST,
    user,
    paymentInfo
  };
}

export function signupSuccess (payload) {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
}

export function signupError (errors) {
  return {
    type: SIGNUP_ERROR,
    errors
  };
}

export function clearSignupStatus () {
  return {
    type: CLEAR_SIGNUP_STATUS,
  };
}
