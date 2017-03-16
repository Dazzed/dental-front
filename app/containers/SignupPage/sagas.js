/*
Patient Signup Page Sagas
================================================================================
*/

/* eslint-disable no-constant-condition, consistent-return */

/*
Imports
------------------------------------------------------------
*/
// libs
import mapValues from 'lodash/mapValues';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { SubmissionError } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, cancelled, fork } from 'redux-saga/effects';
import request from 'utils/request';

// local
import {
  FETCH_OFFICES_REQUEST,
  SIGNUP_REQUEST,
} from './constants';
import {
  fetchOfficesSuccess,
  signupSuccess,
} from './actions';


/*
 Main Saga
 ================================================================================
 */
// Bootstrap sagas
export default [
  main
];

function* main () {
  const watcherA = yield fork(fetchOfficesWatcher);
  const watcherB = yield fork(signupWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}


/*
Fetch Sagas
================================================================================
*/
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


/*
Signup Sagas
================================================================================
*/
function* signupWatcher () {
  while (true) {
    // listen for the SIGNUP_REQUEST action dispatched on form submit
    const { payload } = yield take(SIGNUP_REQUEST);

    // execute the signup task
    const isSuccess = yield call(signup, payload);

    if (isSuccess) {
      yield put(signupSuccess({
        fullName: `${payload.firstName} ${payload.lastName}`
      }));
    }
  }
}

function* signup (data) {
  try {
    // send a post request with the desired user details
    yield call(request, '/api/v1/accounts/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return true;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);
    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('signup', errors));
    return false;
  }
}
