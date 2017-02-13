import { take, call, put, select } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import {
  selectCurrentPath, selectNextPathname
} from 'common/selectors/router.selector';
import { USER_TYPES } from 'common/constants';
import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';

import {
  selectCurrentUser,
  selectSignupCompleteState,
  selectUserType,
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
      const userType = yield select(selectUserType);
      const redirectPaths = [
        '/accounts/login',
        '/accounts/signup',
        '/accounts/dentist-signup',
        '/accounts/complete-signup'
      ];

      if (nextPathName) {
        yield put(replace(nextPathName));
      } else if (!isSignupComplete) {
        yield put(replace('/accounts/complete-signup'));
      } else if (isSignupComplete && redirectPaths.indexOf(currentPath) > -1) {
        if (userType === USER_TYPES.CLIENT) {
          yield put(replace('/your-profile'));
        }
        else if (userType === USER_TYPES.DENTIST) {
          // TODO
          // yield put(replace('/dentist-dashboard'));

          yield put(replace('/dashboard'));
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
