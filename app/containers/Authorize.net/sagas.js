// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
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


// Global Sagas are being injected upon every location change
// Strictly need to cancel so that many requests are avoided.
export function* mergedSaga () {
  const watcherA = yield fork(requestCreditCard);
  const watcherB = yield fork(requestPendingAmount);
  const watcherC = yield fork(requestCharge);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

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

      if (response.data.length > 0) {
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
  mergedSaga,
];

