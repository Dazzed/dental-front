// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import request from 'utils/request';

import {
  REQUEST_PAYMENT_BILL,
} from './constants';


import {
  setBill,
} from './actions';


export function* requestPayBill () {
  yield* takeLatest(REQUEST_PAYMENT_BILL, function* (action) {
    try {
      const body = {
        token: action.token,
        paymentMethod: action.paymentMethod,
      };

      const response = yield call(
        request, `/api/v1/users/${action.userId}/charge-bill`, {
          method: 'POST',
          body: JSON.stringify(body),
        }
      );

      yield put(setBill(response, action.userId));
      if (response.status === 'active') {
        yield put(toastrActions.success('',
          'You have successfully activated your account.' +
          ' You can now make an appointment.'));
      } else if (response.status === 'inactive') {
        yield put(toastrActions.error('',
          'Could not process your request.' +
          ' Sorry for the inconvenience.'));
      }
    } catch (e) {
      console.log(e);
      yield put(setBill());
    }
  });
}

// All sagas to be loaded
export default [
  requestPayBill,
];

