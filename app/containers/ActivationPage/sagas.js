import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import request from 'utils/request';
import { getItem } from 'utils/localStorage';

import {
  activateSuccess,
    activateError
} from 'containers/ActivationPage/actions';

import { ACTIVATE_REQUEST } from './constants';

// Bootstrap sagas
export default [
  activateFlow
];


function* activateFlow () {
  yield* takeEvery(ACTIVATE_REQUEST, activateUser);
}


function* activateUser (action) {
  try {
    // Don't allow logged-in users to activate again.
    const authToken = getItem('auth_token');
    if (authToken) {
      yield put(push('/'));
      return;
    }

    yield call(request, `/api/v1/accounts/activate/${action.payload.key}`);
    yield put(activateSuccess());
  } catch (err) {
    yield put(activateError(err));
  }
}
