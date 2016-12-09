// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import request from 'utils/request';

import {
  REQUEST_CARD_INFO,
  REQUEST_CHARGE,
  REQUEST_PENDING_AMOUNT,
} from './constants';


import {
  setCardInfo,
  setError,
  paymentDone,
  setPendingAmount,
} from './actions';


// NOTE: flag used to control many requests on production
// Maybe dynamic sagas are doing this???
let charging = false;


export function* requestPendingAmount () {
  yield* takeEvery(REQUEST_PENDING_AMOUNT, function* handler (action) {
    try {
      const response = yield call(
        request, `/api/v1/users/${action.userId}/pending-amount`, {
          method: 'GET',
        }
      );

      yield put(setPendingAmount(action.userId, response.data));
    } catch (e) {
      console.log(e);
      yield put(setPendingAmount(action.userId, 0));
    }
  });
}


export function* requestCreditCard () {
  yield* takeLatest(REQUEST_CARD_INFO, function* handler (action) {
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
  yield* takeLatest(REQUEST_CHARGE, function* handler (action) {
    if (charging) {
      return;
    }

    try {
      charging = true;
      const response = yield call(
        request, `/api/v1/users/${action.userId}/charge-bill`, {
          method: 'POST',
          body: JSON.stringify({
            card: action.card,
          }),
        },
      );

      yield put(paymentDone(action.userId, response.data));

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
    } finally {
      charging = false;
    }
  });
}

// All sagas to be loaded
export default [
  requestCreditCard,
  requestPendingAmount,
  requestCharge,
];

