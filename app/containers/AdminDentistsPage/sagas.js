/*
Admin Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { change, stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// app
import request from 'utils/request';

// local
import {
  // fetch
  fetchDentistsSuccess,
  fetchDentistsError,

  fetchDentistDetailsSuccess,
  fetchDentistDetailsError,

  fetchDentistMembersSuccess,
  fetchDentistMembersError,

  fetchDentistReviewsSuccess,
  fetchDentistReviewsError,

  fetchStatsSuccess,
  fetchStatsError,
} from './actions';
import {
  FETCH_DENTISTS_REQUEST,
  FETCH_DENTIST_DETAILS_REQUEST,
  FETCH_DENTIST_MEMBERS_REQUEST,
  FETCH_DENTIST_REVIEWS_REQUEST,
  FETCH_STATS_REQUEST,
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
  const watcherA = yield fork(dentistsFetcher);
  const watcherB = yield fork(dentistDetailsFetcher);
  const watcherC = yield fork(dentistMembersFetcher);
  const watcherD = yield fork(dentistReviewsFetcher);
  const watcherE = yield fork(statsFetcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
}


/* Fetch
 * ========================================================================== */
 
/*
Fetch Dentists
------------------------------------------------------------
*/
function* dentistsFetcher () {
  yield* takeLatest(FETCH_DENTISTS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/dentists');

      // TODO: TESTING HACK
      response.data.push({ ...response.data[0] });
      response.data[2].id = "10";
      response.data.push({ ...response.data[0] });
      response.data[3].id = "11";

      yield put(fetchDentistsSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistsError(error));
    }
  });
}

/*
Fetch Dentist Details
------------------------------------------------------------
*/
function* dentistDetailsFetcher (action) {
  yield* takeLatest(FETCH_DENTIST_DETAILS_REQUEST, function* handler(action) {
    try {
      const { dentistId } = action;
      const response = yield call(request, `/api/v1/dentists/${dentistId}`);
      yield put(fetchDentistDetailsSuccess(response.data));
    } catch (error) {
      yield put(fetchDentistDetailsError(error));
    }
  });
}

/*
Fetch Dentist Members
------------------------------------------------------------
*/
function* dentistMembersFetcher (action) {
  yield* takeLatest(FETCH_DENTIST_MEMBERS_REQUEST, function* handler(action) {
    try {
      const { dentistId } = action;
      const response = yield call(request, `/api/v1/dentists/${dentistId}/members`);
      yield put(fetchDentistMembersSuccess(response.data));
    } catch (error) {
      yield put(fetchDentistMembersError(error));
    }
  });
}

/*
Fetch Dentist Reviews
------------------------------------------------------------
*/
function* dentistReviewsFetcher (action) {
  yield* takeLatest(FETCH_DENTIST_REVIEWS_REQUEST, function* handler(action) {
    try {
      const { dentistId } = action;
      const response = yield call(request, `/api/v1/dentists/${dentistId}/reviews`);
      yield put(fetchDentistReviewsSuccess(response.data));
    } catch (error) {
      yield put(fetchDentistReviewsError(error));
    }
  });
}

/*
Fetch Stats
------------------------------------------------------------
*/
function* statsFetcher () {
  yield* takeLatest(FETCH_STATS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/admin/stats');
      yield put(fetchStatsSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistsError(error));
    }
  });
}
