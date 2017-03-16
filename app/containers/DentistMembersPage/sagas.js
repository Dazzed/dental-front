/*
Dentist Members Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// app
import request from 'utils/request';

// local
import {
  fetchPatientsSuccess,
  fetchPatientsError,
} from './actions';
import {
  FETCH_PATIENTS_REQUEST,
} from './constants';


/*
Sagas
================================================================================
*/
// Bootstrap sagas
export default [
  main,
];

function* main () {
  const watcherA = yield fork(patientsFetcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

function* patientsFetcher () {
  yield* takeLatest(FETCH_PATIENTS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/users/me/members');
      yield put(fetchPatientsSuccess(response.data));
    } catch (error) {
      yield put(fetchPatientsError(error));
    }
  });
}
