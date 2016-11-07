import {
  REQUEST_PAYMENT_BILL,
  SET_BILL,
} from './constants';


export function requestPayBill (token, paymentMethod, userId) {
  return {
    type: REQUEST_PAYMENT_BILL,
    token,
    paymentMethod,
    userId,
  };
}


export function setBill (payload, userId) {
  return {
    type: SET_BILL,
    payload,
    userId,
  };
}

