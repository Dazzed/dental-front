import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';

import data from './mockData'; // TODO: Remove this once API is hooked up

import {
  // search
  searchSuccess,
} from './actions';

function* main() {
  const watcherA = yield fork(searchWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

function* searchWatcher() {
  while (true) {
    yield takeLatest('SEARCH_PAGE_SEARCH_REQUEST', function* handler({payload}) {
      try {
        const requestURL = '/api/v1/search/';
        const body = JSON.stringify(payload);
        const params = {
          method: 'POST',
          body
        };
        const { dentists } = yield call(request, requestURL, params);
        
        yield put(searchSuccess(dentists));
      } catch (e) {
        console.log(e);
      }
    });
  }
}

export default [
  main
];
