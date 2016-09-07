import { take, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { removeItem } from 'utils/localStorage';

import { selectCurrentPath } from 'common/selectors/router.selector';
import { selectCurrentUser } from 'containers/App/selectors';

import { setAuthData, setUserData } from 'containers/App/actions';

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
  const jwtToken = localStorage.jwtToken;

  if (user || !jwtToken) {
    return;
  }

  try {
    const response = yield call(request, requestURL);
    if (!response.err) {
      yield put(setUserData(response.data));

      // If the user landed on `/login` as the first route, redirect him
      const currentPath = yield select(selectCurrentPath);
      if ([ '/login', '/signup', 'dentist-signup' ].indexOf(currentPath) > -1) {
        yield put(push('/dashboard'));
      }
    }
  } catch (e) {
    yield put(setAuthData(false));
    yield put(setUserData(false));

    // if returns forbidden we remove the token from local storage
    if (e.res.status === 401) {
      removeItem('jwtToken');
    }
  }
}


export default [
  refreshAuthFlow,
];
