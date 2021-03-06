// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { initialize } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';


import request from 'utils/request';

import {
  fetchDentistInfoSuccess,
  updateDentistInfoSuccess,
} from './actions';

import {
  FETCH_DENTIST_INFO,
  UPDATE_DENTIST_INFO,
} from './constants';

import {
  selectDentistInfo,
} from './selectors';

export default [
  main
];

function* main () {
  const watcherA = yield fork(fetchDentistInfo);
  const watcherB = yield fork(updateDentistInfo);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

// Individual exports for testing
function* fetchDentistInfo () {
  yield* takeLatest(FETCH_DENTIST_INFO, function* handler () {
    try {
      const dentistInfo = yield call(request, '/api/v1/users/me/dentist-info');
      yield put(fetchDentistInfoSuccess(dentistInfo));

      // Force initialization form
      const state = yield select(selectDentistInfo);
      yield put(initialize('office-information', state));
    } catch (e) {
      console.log(e);
    }
  });
}

function* updateDentistInfo () {
  yield* takeLatest(UPDATE_DENTIST_INFO, function* handler (action) {
    try {
      const body = action.payload;
      body.services = body.serviceSelected;

      const dentistInfo =
        yield call(request, '/api/v1/users/me/dentist-info', {
          method: 'POST',
          body: JSON.stringify(body),
        });

      yield put(updateDentistInfoSuccess(dentistInfo));
      yield put(toastrActions.success('', 'Your info has been updated!'));
    } catch (e) {
      console.log(e);
    }
  });
}
