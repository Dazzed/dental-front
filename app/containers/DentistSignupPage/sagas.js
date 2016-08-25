// /**
//  *
//  */

// /* eslint-disable no-constant-condition, consistent-return */

import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { get, omit } from 'lodash';

import request from 'utils/request';
import { signupError } from 'containers/DentistSignupPage/actions';
import { DENTIST_SIGNUP_REQUEST } from './constants';

// Bootstrap sagas
export default [
  signupFlow
];

function* signupFlow () {
  while (true) {

    // listen for the SIGNUP_REQUEST action dispatched on form submit
    const { payload: { data, resolve, reject } } = yield take(DENTIST_SIGNUP_REQUEST);

    // execute the signup task
    const isSuccess = yield call(signup, data, resolve, reject);

    if (isSuccess) {
      alert('You have signed up successfully! Please check your email.');
      yield put(push('/login'));
    }

  }
}

function* signup (data, resolve, reject) {
  try {

    // send a post request with the desired user details
    const response = yield call(request, '/api/v1/accounts/dentist-signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    // TODO: do i need this? I will navigate away anyways
    // resolve(response);

    // indicate successful signup
    return true;

  } catch (err) {

    // reject the onSubmit promise of redux-form
    if (reject) {
      const errors = Object.keys(get(err, 'errors')).join();
      reject(new SubmissionError({ _error: `${errors} invalid` }));
    }

    // dispatch LOGIN_ERROR action
    yield put(signupError(err));

    return false;
  }
}
