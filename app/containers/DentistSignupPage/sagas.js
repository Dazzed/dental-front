/*
Dentist Signup Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import mapValues from 'lodash/mapValues';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';

// local
import {
  DENTIST_SIGNUP_REQUEST,
  DENTIST_SPECIALTIES_REQUEST,
} from './constants';
import {
  dentistSpecialtiesSuccess,
  signupSuccess,
} from './actions';


/*
Main Saga
================================================================================
*/
// Bootstrap sagas
export default [
  main,
];

function* main () {
  const watcherA = yield fork(fetchDentistSpecialties);
  const watcherB = yield fork(signupWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}


/*
Fetch Sagas
================================================================================
*/
function* fetchDentistSpecialties () {
  yield* takeLatest(DENTIST_SPECIALTIES_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/dentist-specialties');
      yield put(dentistSpecialtiesSuccess(response.data));
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
    // listen for the DENTIST_SIGNUP_REQUEST action dispatched on form submit
    const { payload } = yield take(DENTIST_SIGNUP_REQUEST);

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
    yield call(request, '/api/v1/accounts/dentist-signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return true;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);
    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('dentist-signup', errors));
    return false;
  }
}
