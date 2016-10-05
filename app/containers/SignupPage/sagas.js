// /**
//  *
//  */

// /* eslint-disable no-constant-condition, consistent-return */

import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { stopSubmit } from 'redux-form';
import mapValues from 'lodash/mapValues';

import request from 'utils/request';
import { SIGNUP_REQUEST } from './constants';

// Bootstrap sagas
export default [
  signupFlow
];

function* signupFlow () {
  while (true) {
    // listen for the SIGNUP_REQUEST action dispatched on form submit
    const { payload } = yield take(SIGNUP_REQUEST);

    // execute the signup task
    const isSuccess = yield call(signup, payload);

    if (isSuccess) {
      yield put(push('/accounts/login'));
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

    // dispatch LOGIN_ERROR action
    yield put(stopSubmit('dentist-signup', errors));
    return false;
  }
}
