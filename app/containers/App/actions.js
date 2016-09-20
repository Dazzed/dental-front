import {
  ME_FROM_TOKEN,
  SET_AUTH_DATA,
  SET_USER_DATA,
  DENTIST_SPECIALTIES_REQUEST,
  DENTIST_SPECIALTIES_SUCCESS,
  DENTIST_SPECIALTIES_ERROR,
  CHANGE_PAGE_TITLE,
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


export function setAuthData (authData) {
  return {
    type: SET_AUTH_DATA,
    payload: {
      authData,
    },
  };
}


export function dentistSpecialtiesRequest (payload) {
  return {
    type: DENTIST_SPECIALTIES_REQUEST,
    payload
  };
}


export function dentistSpecialtiesSuccess (payload) {
  return {
    type: DENTIST_SPECIALTIES_SUCCESS,
    payload
  };
}


export function dentistSpecialtiesError (payload) {
  return {
    type: DENTIST_SPECIALTIES_ERROR,
    payload
  };
}


export function changePageTitle (payload) {
  return {
    type: CHANGE_PAGE_TITLE,
    payload,
  };
}
