// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import request from 'utils/request';

import {
  fetchDentistInfoSuccess,
} from './actions';

import {
  FETCH_DENTIST_INFO,
} from './constants';

// Individual exports for testing
export function* fetchDentistInfo () {
  yield* takeLatest(FETCH_DENTIST_INFO, function* () {
    try {
      const specialties = yield call(request, '/api/v1/users/me/dentist-info');
      yield put(fetchDentistInfoSuccess(specialties));
    } catch (e) {
      console.log(e);
    }
  });
}

// All sagas to be loaded
export default [
  fetchDentistInfo,
];
