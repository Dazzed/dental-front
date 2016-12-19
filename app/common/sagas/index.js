import { take, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';

import {
  selectCurrentPath,
  selectNextPathname,
} from 'common/selectors/router.selector';
import {
  selectCurrentUser,
  selectSignupCompleteState,
} from 'containers/App/selectors';

import { setAuthState, setUserData } from 'containers/App/actions';

import { ME_FROM_TOKEN } from 'containers/App/constants';

function* refreshAuthFlow () {
  while (true) {
    yield take(ME_FROM_TOKEN);
    yield call(loadUserFromToken);
  }
}


function* loadUserFromToken () {
  const requestURL = '/api/v1/users/me';
  const user = yield select(selectCurrentUser);
  const authToken = getItem('auth_token');

  if (user || !authToken) {
    return;
  }

  try {
    const response = yield call(request, requestURL);
    if (!response.err) {
      yield put(setUserData(response.data));

      // If the user landed on `/login` as the first route, redirect him
      // const currentPath = yield select(selectCurrentPath);
      // const pathsToRedirect = [
      //   '/accounts/login',
      //   '/accounts/signup',
      //   '/accounts/dentist-signup'
      // ];
      // if (pathsToRedirect.indexOf(currentPath) > -1) {
      //   console.log('COMMON SAGA going to dashboard', currentPath)
      //   yield put(push('/dashboard'));
      // }

      const nextPathName = yield select(selectNextPathname);
      const isSignupComplete = yield select(selectSignupCompleteState);

      if (nextPathName) {
        yield put(push(nextPathName));
      } else {
        if (isSignupComplete) { // eslint-disable-line
          console.log('COMMON SAGA - GOING TO DASHBOARD');
          yield put(push('/dasbhoard'));
        } else {
          console.log('COMMON SAGA - GOING TO COMPLETE SIGNUP ');
          yield put(push('/accounts/complete-signup'));
        }
      }
    }
  } catch (e) {
    yield put(setAuthState(false));
    yield put(setUserData(false));

    // if returns forbidden we remove the token from local storage
    if (e.res && e.res.status === 401) {
      removeItem('auth_token');
    } else {
      console.error(e);
    }
  }
}


export default [
  refreshAuthFlow,
];
