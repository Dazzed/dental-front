import {
  REQUEST_CARD_INFO,
  SET_CARD_INFO,
  SET_ERROR,
  REQUEST_CHARGE,
  CLEAR_DATA,
  PAYMENT_DONE,
  OPEN_FORM,
} from './constants';


export function requestCardInfo (userId) {
  return {
    type: REQUEST_CARD_INFO,
    userId,
  };
}


export function openForm (userId) {
  return {
    type: OPEN_FORM,
    userId,
  };
}


export function requestCharge (userId, card) {
  return {
    type: REQUEST_CHARGE,
    userId,
    card,
  };
}


export function paymentDone (userId, payload) {
  return {
    type: PAYMENT_DONE,
    userId,
    payload,
  };
}


export function clearData () {
  return { type: CLEAR_DATA };
}


export function setError (error) {
  return {
    type: SET_ERROR,
    error,
  };
}


export function setCardInfo (info) {
  return {
    type: SET_CARD_INFO,
    info,
  };
}