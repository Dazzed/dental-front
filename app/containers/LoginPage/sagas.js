/**
 *
 */

/* eslint-disable no-constant-condition, consistent-return */

import {
  take, call, put, cancel, cancelled, fork, select
} from 'redux-saga/effects';

import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import get from 'lodash/get';

import request from 'utils/request';
import { setItem, removeItem } from 'utils/localStorage';
import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT,
} from 'containers/LoginPage/constants';

import { loginError } from 'containers/LoginPage/actions';
import { meFromToken, setAuthState, setUserData } from 'containers/App/actions';
import { selectNextPathname } from 'common/selectors/router.selector';


// Bootstrap sagas
export default [
  loginFlow,
];

function* loginFlow () {
  while (true) {
    // listen for the LOGIN_REQUEST action dispatched on form submit
    const { payload: { data, resolve, reject } } = yield take(LOGIN_REQUEST);

    // execute the authorize task asynchronously
    const task = yield fork(authorize, data, resolve, reject);

    // listen for the LOGOUT or LOGIN_ERROR action
    const action = yield take([ LOGOUT, LOGIN_ERROR ]);

    if (action.type === LOGOUT) {
      // since the authorize task executed asynchronously,
      // it is possible the LOGOUT action gets fired before
      // the the authorize task completes, so we call cancel on it
      yield cancel(task);

      // dispatch action to set user details to app.currentUser
      yield put(setAuthState(false));
      yield put(setUserData(false));

      // redirect to home page
      yield put(push('/'));
    }

    // remove auth token from localstorage
    yield call(removeItem, 'auth_token');
  }
}

function* authorize (data, resolve, reject) {
  try {
    // send a post request with the login credentials
    const response = yield call(request, '/api/v1/accounts/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    // TODO: do i need this? I will navigate away anyways
    // resolve(response);

    // dispatch action to set user details to app.currentUser
    yield put(setAuthState(true));

    // set auth token to localstorage
    yield call(setItem, 'auth_token', response.token);

    // load details of authenticated user
    yield put(meFromToken());

    // redirect to nextPathName or to the dashboard page
    const nextPathName = yield select(selectNextPathname);
    if (nextPathName) {
      yield put(push(nextPathName));
    } else {
      yield put(push('/dashboard'));
    }

    // return the response from the generator task
    return response;
  } catch (err) {
    // reject the onSubmit promise of redux-form
    if (reject) {
      reject(new SubmissionError({ _error: get(err, 'meta.message') }));
    }

    // dispatch LOGIN_ERROR action
    yield put(loginError(err));
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

