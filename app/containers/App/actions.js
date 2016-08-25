import {
  ME_FROM_TOKEN,
  SET_AUTH_DATA,
  SET_USER_DATA,
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
