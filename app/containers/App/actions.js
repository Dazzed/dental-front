import {
  ME_FROM_TOKEN,
  SET_AUTH_STATE,
  SET_USER_DATA,

  SERVICES_REQUEST,
  SERVICES_REQUEST_SUCCESS,
  SERVICES_REQUEST_ERROR,

  CHANGE_PAGE_TITLE,
  REVIEW_ADDED,
  REVIEW_EDITED
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
