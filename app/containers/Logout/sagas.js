import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';

import { removeItem } from 'utils/localStorage';

import {
  LOGOUT,
} from 'containers/LoginPage/constants';

import { setAuthState, setUserData } from 'containers/App/actions';

// Bootstrap sagas
export default [
  main
];

function* main () {
  const watcherInstance = yield fork(logoutWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherInstance);
}

function* logoutWatcher () {
  yield* takeLatest(LOGOUT, function* handler () {
    try {
      yield call(removeItem, 'auth_token');
      yield put(setAuthState(false));
      yield put(setUserData(false));

      yield put(push('/'));
    } catch (e) {
      console.log(e);
    }
  });
}
