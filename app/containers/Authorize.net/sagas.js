// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import request from 'utils/request';

import {
  REQUEST_TOKEN,
} from './constants';


import {
  setToken,
} from './actions';


export function* requestToken () {
  yield* takeLatest(REQUEST_TOKEN, function* (action) {
    try {
      const response = yield call(
        request, `/api/v1/users/${action.userId}/authorize-token`, {
          method: 'POST',
          body: JSON.stringify(action.payload),
        }
      );

      yield put(setToken(response.data.token, action.userId));
    } catch (e) {
      console.log(e);
      yield put(setToken());
    }
  });
}

// All sagas to be loaded
export default [
  requestToken,
];


