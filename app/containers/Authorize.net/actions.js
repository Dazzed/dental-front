import {
  REQUEST_TOKEN,
  SET_TOKEN,
} from './constants';


export function requestToken (userId, payload) {
  return {
    type: REQUEST_TOKEN,
    userId,
    payload,
  };
}


export function setToken (token, userId) {
  return {
    type: SET_TOKEN,
    userId,
    token,
  };
}
