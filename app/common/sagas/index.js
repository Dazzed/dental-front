import { take, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';

import { selectCurrentPath } from 'common/selectors/router.selector';
import { selectCurrentUser } from 'containers/App/selectors';

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
      const currentPath = yield select(selectCurrentPath);
      const pathsToRedirect = [ '/login', '/signup', '/dentist-signup' ];
      if (pathsToRedirect.indexOf(currentPath) > -1) {
        yield put(push('/dashboard'));
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
