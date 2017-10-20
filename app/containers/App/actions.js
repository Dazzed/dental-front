import {
  ME_FROM_TOKEN,
  SET_AUTH_STATE,
  SET_USER_DATA,

  SERVICES_REQUEST,
  SERVICES_REQUEST_SUCCESS,
  SERVICES_REQUEST_ERROR,

  CHANGE_PAGE_TITLE,
  REVIEW_ADDED,
  REVIEW_EDITED,

  // custom memberships
  ADD_CUSTOM_MEMBERSHIP,
  EDIT_CUSTOM_MEMBERSHIP,
  DELETE_CUSTOM_MEMBERSHIP
} from './constants';


export function meFromToken () {
  return {
    type: ME_FROM_TOKEN,
  };
}


export function setUserData (currentUser) {
  return {
    type: SET_USER_DATA,
    payload: {
      currentUser,
    },
  };
}


export function setAuthState (newAuthState) {
  return {
    type: SET_AUTH_STATE,
    payload: {
      newAuthState,
    },
  };
}


export function requestServices (payload) {
  return {
    type: SERVICES_REQUEST,
    payload
  };
}


export function requestServicesSuccess (payload) {
  return {
    type: SERVICES_REQUEST_SUCCESS,
    payload
  };
}


export function requestServicesError (payload) {
  return {
    type: SERVICES_REQUEST_ERROR,
    payload
  };
}


export function changePageTitle (payload) {
  return {
    type: CHANGE_PAGE_TITLE,
    payload,
  };
}

export function reviewAdded (payload) {
  return {
    type: REVIEW_ADDED,
    payload
  };
}

export function reviewEdited (payload) {
  return {
    type: REVIEW_EDITED,
    payload
  };
}

export function addCustomMembership (membershipPlan) {
  return {
    type: ADD_CUSTOM_MEMBERSHIP,
    membershipPlan
  };
}

export function editCustomMembership (customMemberships) {
  return {
    type: EDIT_CUSTOM_MEMBERSHIP,
    customMemberships
  };
}

export function deleteCustomMembership (customMemberships) {
  return {
    type: DELETE_CUSTOM_MEMBERSHIP,
    customMemberships
  };
}
