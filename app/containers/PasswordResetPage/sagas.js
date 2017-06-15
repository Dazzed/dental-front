/*
Login Page Sagas
================================================================================
*/

/* eslint-disable no-constant-condition, consistent-return */

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

// app
// import { meFromToken, setAuthState, setUserData } from 'containers/App/actions';

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
  const watcherB = yield fork(forgotPaswordWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherB);
}


/*
Login Sagas
================================================================================
*/
function* forgotPaswordWatcher() {
  while (true) {
    // listen for the PASSWORD_RESET_REQUEST action dispatched on form submit
    const { payload: { data, resolve, reject } } = yield take(PASSWORD_RESET_REQUEST);

    // execute the passwordReset task asynchronously
    const task = yield fork(passwordReset, data, resolve, reject);
  }
}

function* passwordReset(data, resolve, reject) {
  try {
    // send a post request with the login credentials
    const response = yield call(request, '/api/v1/accounts/reset-password', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response;
  } catch (err) {
    // reject the onSubmit promise of redux-form
    if (reject) {
      reject(new SubmissionError({ _error: get(err, 'meta.message') }));
    }

    // dispatch PASSWORD_RESET_ERROR action
    yield put(passwordResetError(err));
  } finally {
    // because this generator task is asyc, it is possible to
    // send a logout action before the user gets logged in
    // whenever all the above code finish without an error,
    // check if this task got cancelled by the parent generator
    // http://yelouafi.github.io/redux-saga/docs/advanced/NonBlockingCalls.html
    if (yield cancelled()) {
      // TODO: do i need something here?
      // ... put special cancellation handling code here
    }
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
