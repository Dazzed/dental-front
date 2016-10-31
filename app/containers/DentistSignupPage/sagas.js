import { take, call, put } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';
import mapValues from 'lodash/mapValues';

import request from 'utils/request';

import { signupSuccess } from 'containers/DentistSignupPage/actions';

import { DENTIST_SIGNUP_REQUEST } from './constants';

// Bootstrap sagas
export default [
  signupFlow,
];


function* signupFlow () {
  while (true) {
    // listen for the SIGNUP_REQUEST action dispatched on form submit
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
    // dispatch LOGIN_ERROR action
    yield put(stopSubmit('dentist-signup', errors));

    return false;
  }
}
