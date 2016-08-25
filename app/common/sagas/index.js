import { take, call, put, cancel, cancelled, fork, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import request from 'utils/request';

import { ME_FROM_TOKEN } from 'containers/App/constants';
import { selectCurrentUser } from 'containers/App/selectors';
import { selectCurrentPath } from 'common/selectors/router.selector';
import { setAuthData, setUserData } from 'containers/App/actions';

function* refreshAuthFlow () {
  while (true) {
    yield take(ME_FROM_TOKEN);
    yield call(loadUserFromToken);
  }
}

function* loadUserFromToken () {
  const requestURL = '/api/v1/users/me';
  const user = yield select(selectCurrentUser);
  const jwtToken = localStorage['jwtToken'];

  if (user || !jwtToken) {
    return;
  }

  const response = yield call(request, requestURL);
  if (!response.err) {
    yield put(setUserData(response.data));

    // If the user landed on `/login` as the first route, redirect him
    const currentPath = yield select(selectCurrentPath);
    if ([ '/login', '/signup', 'dentist-signup' ].indexOf(currentPath) > -1) {
      yield put(push('/dashboard'));
    }
  } else {
    yield put(setAuthData(false));
    yield put(setUserData(false));
    // removeItem('jwtToken');
  }
}

export default [
  refreshAuthFlow
];
