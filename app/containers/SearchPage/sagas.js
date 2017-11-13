import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';

import {
  // search
  searchSuccess,
  specialtiesSuccess,
  countSuccess,
  searchError
} from './actions';

function* main() {
  yield fork(searchWatcher);
}

function* searchWatcher() {
  while (true) {
    yield takeLatest('SEARCH_PAGE_SEARCH_REQUEST', function* handler({payload}) { 
      try {
        const requestURL = '/api/v1/search/';
        const { specialtiesRequired } = payload;
        if (specialtiesRequired) {
          payload.specialtiesRequired = true;
          payload.countRequired = true;
        }
        const body = JSON.stringify(payload);
        const params = {
          method: 'POST',
          body
        };
        const { dentists, specialtiesList, totalDentistCount } = yield call(request, requestURL, params);
        
        yield put(searchSuccess(dentists));
        if (specialtiesList) {
          yield put(specialtiesSuccess(specialtiesList));
        }
        yield put(countSuccess(totalDentistCount));
      } catch (e) {
        console.log(e);
        if (e.errors) {
          yield put(searchError(e.errors));
        }
      }
    });
  }
}

export default [
  main
];
