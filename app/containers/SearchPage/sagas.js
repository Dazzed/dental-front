import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';

import data from './mockData'; // TODO: Remove this once API is hooked up

import {
  // search
  searchSuccess,
  specialtiesSuccess,
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
        const { specialtiesRequired } = payload;
        if (specialtiesRequired) {
          payload.specialtiesRequired = true;
        }
        const body = JSON.stringify(payload);
        const params = {
          method: 'POST',
          body
        };
        const { dentists, specialtiesList } = yield call(request, requestURL, params);
        
        yield put(searchSuccess(dentists));
        if (specialtiesList) {
          yield put(specialtiesSuccess(specialtiesList));
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
}

export default [
  main
];
