import { takeLatest } from 'redux-saga';

import {
  call, put
} from 'redux-saga/effects';

import { push } from 'react-router-redux';

import { removeItem } from 'utils/localStorage';

import {
  LOGOUT,
} from 'containers/LoginPage/constants';

import { setAuthState, setUserData } from 'containers/App/actions';

// Bootstrap sagas
export default [
  logoutFlow,
];


function* logoutFlow () {
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
