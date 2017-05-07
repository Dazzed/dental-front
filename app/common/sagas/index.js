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
  const authToken = getItem('auth_token');

  if (user || !authToken) {
    return;
  }

  try {
    const response = yield call(request, requestURL);
    if (!response.err) {
      yield put(setUserData(response.data));

      // This is mainly for the step after login page
      const nextPathName = yield select(selectNextPathname);
      const currentPath = yield select(selectCurrentPath);
      const userType = yield select(selectUserType);
      const redirectPaths = [
        '/accounts/login',
        '/accounts/signup',
        '/accounts/dentist-signup'
      ];

      if (nextPathName) {
        yield put(replace(nextPathName));
      } else if (redirectPaths.indexOf(currentPath) > -1) {
        if (userType === USER_TYPES.CLIENT) {
          yield put(replace('/patient/profile'));
        }
        else if (userType === USER_TYPES.DENTIST) {
          yield put (replace('/dentist/new-members'));
        }
        else if (userType === USER_TYPES.ADMIN) {
          yield put (replace('/admin/dentists'));
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
