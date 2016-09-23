// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import request from 'utils/request';

import {
  fetchDentistInfoSuccess,
  updateDentistInfoSuccess,
} from './actions';

import {
  FETCH_DENTIST_INFO,
  UPDATE_DENTIST_INFO,
} from './constants';

// Individual exports for testing
export function* fetchDentistInfo () {
  yield* takeLatest(FETCH_DENTIST_INFO, function* () {
    try {
      const dentistInfo = yield call(request, '/api/v1/users/me/dentist-info');
      yield put(fetchDentistInfoSuccess(dentistInfo));
    } catch (e) {
      console.log(e);
    }
  });
}

export function* updateDentistInfo () {
  yield* takeLatest(UPDATE_DENTIST_INFO, function* (action) {
    try {
      const body = action.payload;
      body.services = body.serviceSelected;

      const dentistInfo =
        yield call(request, '/api/v1/users/me/dentist-info', {
          method: 'POST',
          body: JSON.stringify(body),
        });

      yield put(updateDentistInfoSuccess(dentistInfo));
    } catch (e) {
      console.log(e);
    }
  });
}

// All sagas to be loaded
export default [
  fetchDentistInfo,
  updateDentistInfo,
];
