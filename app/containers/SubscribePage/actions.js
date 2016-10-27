import {
  REQUEST_BILL,
  REQUEST_PAYMENT_BILL,
  SET_BILL,
} from './constants';


export function requestBill () {
  return {
    type: REQUEST_BILL,
  };
}


export function requestPayBill (payload) {
  return {
    type: REQUEST_PAYMENT_BILL,
    payload,
  };
}


export function setBill (bill) {
  return {
    type: SET_BILL,
    bill,
  };
}
