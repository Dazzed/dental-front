/*
Your Profile Page Sagas
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
  // TODO
} from './actions';
import {
  // TODO
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
  // TODO
  const watcherA = yield fork(todoSomeFetcherName);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

function* todoSomeFetcherName () {
  // TODO

  // EXAMPLE
  /*
  yield* takeLatest(DENTIST_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/dentist');
      yield put(setDentist(response.data));
    } catch(err) {
      yield put(setDentistErrors(err));
    }
  });
  */
}
