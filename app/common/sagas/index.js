import { take, call, put, select } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import {
  selectCurrentPath, selectNextPathname
} from 'common/selectors/router.selector';
import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';

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
  const isFullyLoaded = yield select(selectSignupCompleteState);
  const authToken = getItem('auth_token');

  if ((user && isFullyLoaded) || !authToken) {
    return;
  }

  try {
    const response = yield call(request, requestURL);
    if (!response.err) {
      yield put(setUserData(response.data));

      // This is mainly for the step after login page
      const nextPathName = yield select(selectNextPathname);
      const currentPath = yield select(selectCurrentPath);
      const isSignupComplete = yield select(selectSignupCompleteState);
      const dashboardPath = '/dashboard';
      const signupPath = '/accounts/complete-signup';

      if (nextPathName) {
        yield put(replace(nextPathName));
      } else {
        if (isSignupComplete && currentPath !== dashboardPath) { // eslint-disable-line
          console.log('COMMON SAGA - GOING TO DASHBOARD');
          yield put(replace(dashboardPath));
        } else if (!isSignupComplete && currentPath !== signupPath) {
          console.log('COMMON SAGA - GOING TO COMPLETE SIGNUP ');
          yield put(replace(signupPath));
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
