import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';

import {
  FETCH_OFFICES,
  FETCH_OFFICES_SUCCESS,
  FETCH_OFFICES_ERROR
} from './constants';

import request from 'utils/request';

export default [
  main
];

function* main() {
  const watcherA = yield fork(officesRequestWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

function* officesRequestWatcher() {
  yield takeLatest(FETCH_OFFICES, function* handler({ officeSlug }){
    try {
      const response = yield call(request, `/api/v1/dentists/get_linked_offices/${officeSlug}`);
      yield put({ type: FETCH_OFFICES_SUCCESS, payload: response.offices });

    } catch (err) {
      console.log("ERR");
      console.log(err);
      yield put({ type: FETCH_OFFICES_ERROR });
    }
  });
}
