// /**
//  *
//  */

// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { stopSubmit } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';
import mapValues from 'lodash/mapValues';

import request from 'utils/request';
import {
  finalSignupSuccess, fetchOfficesSuccess
} from 'containers/SignupFinalPage/actions';
import { FINAL_SIGNUP_REQUEST, FETCH_OFFICES_REQUEST } from './constants';

// Bootstrap sagas
export default [
  main
];

function* main () {
  const watcherA = yield fork(finalSignupWatcher);
  const watcherB = yield fork(fetchOfficesWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

function* finalSignupWatcher () {
  while (true) {
    // listen for the SIGNUP_REQUEST action dispatched on form submit
    const { payload } = yield take(FINAL_SIGNUP_REQUEST);

    // execute the signup task
    const isSuccess = yield call(finalSignup, payload);

    if (isSuccess) {
      yield put(finalSignupSuccess());
    }
  }
}

function* finalSignup (data) {
  try {
    // send a post request with the desired user details
    yield call(request, '/api/v1/accounts/complete-signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    return true;
  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    // dispatch LOGIN_ERROR action
    yield put(stopSubmit('signupFinal', errors));
    return false;
  }
}

function* fetchOfficesWatcher () {
  yield* takeLatest(FETCH_OFFICES_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/offices');
      yield put(fetchOfficesSuccess(response.data));
    } catch (e) {
      console.log(e);
    }
  });
}

