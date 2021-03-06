// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';

import request from 'utils/request';

import {
  REQUEST_BILL,
  REQUEST_PAYMENT_BILL,
} from './constants';


import {
  setBill,
} from './actions';


// Individual exports for testing
export function* requestBill () {
  yield* takeLatest(REQUEST_BILL, function* handler () {
    try {
      const bill = yield call(request, '/api/v1/users/me/bill');
      yield put(setBill(bill));
    } catch (e) {
      console.log(e);
    }
  });
}

export function* requestPayBill () {
  yield* takeLatest(REQUEST_PAYMENT_BILL, function* handler (action) {
    try {
      const body = { token: action.payload.id };

      yield call(request, '/api/v1/users/me/charge-bill', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      yield put(push('/patient/profile'));
      yield put(setBill({}));
      yield put(toastrActions.success('',
        'You have successfully activated your account.' +
        ' You can now make an appointment.'));
    } catch (e) {
      console.log(e);
    }
  });
}

// All sagas to be loaded
export default [
  requestBill,
  requestPayBill,
];
