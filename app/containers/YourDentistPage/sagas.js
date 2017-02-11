/*
Your Dentist Page Sagas
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
import { setUserData } from 'containers/App/actions';
import { requestPendingAmount } from 'containers/Authorize.net/actions';

// local
import {
  setDentist,
  setDentistErrors,
} from './actions';
import {
  DENTIST_REQUEST,
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
  const watcherA = yield fork(dentistFetcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

function* dentistFetcher () {
  yield* takeLatest(DENTIST_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/dentist');
      yield put(setDentist(response.data));
    } catch(err) {
      yield put(setDentistErrors(err));
    }
  });
}
