// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import request from 'utils/request';

import {
  REQUEST_CARD_INFO,
  REQUEST_CHARGE,
} from './constants';


import {
  setCardInfo,
  setError,
  paymentDone,
} from './actions';


export function* requestToken () {
  yield* takeLatest(REQUEST_CARD_INFO, function* (action) {
    try {
      const response = yield call(
        request, `/api/v1/users/${action.userId}/credit-card`, {
          method: 'GET',
        }
      );

      yield put(setCardInfo(response.data));
    } catch (e) {
      console.log(e);
      yield put(setCardInfo());
    }
  });
}


export function* requestCharge () {
  yield* takeLatest(REQUEST_CHARGE, function* (action) {
    try {
      const response = yield call(
        request, `/api/v1/users/${action.userId}/charge-bill`, {
          method: 'POST',
          body: JSON.stringify({
            card: action.card,
          }),
        },
      );

      yield put(paymentDone(action.userId, response));
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
      if (e.errors) {
        yield put(setError(e.errors.errorMessage : null));
      }
    }
  });
}

// All sagas to be loaded
export default [
  requestToken,
  requestCharge,
];


