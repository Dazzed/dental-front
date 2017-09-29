/*
Login Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, cancelled, fork } from 'redux-saga/effects';
import { setItem, removeItem } from 'utils/localStorage';
import request from 'utils/request';
import { actions as toastrActions } from 'react-redux-toastr';

// local
import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_AUTH,
  PASSWORD_RESET_ERROR,
} from './constants';
import { passwordResetError } from './actions';


/*
 Main Saga
 ================================================================================
 */

// Bootstrap sagas
export default [
  main
];

function* main() {
  const watcherA = yield fork(passwordResetWatcher);

  yield take(LOCATION_CHANGE);
// NOTE: Can't cancel the watcher on page loads, otherwise the toastr message
//       won't be shown.
//  yield cancel(watcherA);
}


/*
Login Sagas
================================================================================
*/
function* passwordResetWatcher() {
  while (true) {
    const { payload } = yield take(PASSWORD_RESET_REQUEST);

    yield fork(passwordReset, payload);
    yield put(push('/accounts/login'));
  }
}

function* passwordReset(payload) {
  try {
    const requestURL = `/api/v1/accounts/reset-password`;
    const params = {
      method: 'POST',
      body: JSON.stringify(payload.data),
    };

    const response = yield call(request, requestURL, params);
    if (response.success === true) {
      yield put(toastrActions.success('New password has been set!'));
    } else {
      yield put(toastrActions.error('Your password could not be changed.  The password reset link may have already been used, or it may be expired.  Please try the password reset process again.'));
    }

  } catch (err) {
    yield put(toastrActions.error('Your password could not be changed.  The password reset link may have already been used, or it may be expired.  Please try the password reset process again.'));
  }
}

function* passwordResetAuth(data, resolve, reject) {
  try {
    // send a post request with the login credentials
    const response = yield call(request, `/api/v1/accounts/reset-password?auth=${data.token}`, {
      method: 'GET'
    });

    // yield call(setItem, 'message', response.message);
    return response;
  } catch (err) {
    if (reject) {
      reject(new SubmissionError({ _error: get(err, 'meta.message') }));
    }
    yield put(passwordResetError(err));
  } finally {

    if (yield cancelled()) {
    }
  }
}
