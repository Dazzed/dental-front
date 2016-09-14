import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  MY_DENTIST_REQUEST,
  MY_FAMILY_REQUEST,
} from 'containers/Dashboard/constants';

import {
  myDentistFetched,
  myDentistFetchingError,
  myFamilyFetched,
  myFamilyFetchingError,
} from 'containers/Dashboard/actions';

import {
  fetchMyDentist as fetchMyDentistMock,
  fetchMyFamily as fetchMyFamilyMock,
} from './stubApi';

// Individual exports for testing
export function* userDashboardSaga () {
  const watcherA = yield fork(fetchMyDentistWatcher);
  const watcherB = yield fork(fetchMyFamilyWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

export function* dentistDashboardSaga () {
  yield take(LOCATION_CHANGE);
  return;
}

export function* fetchMyDentistWatcher () {
  yield* takeLatest(MY_DENTIST_REQUEST, fetchMyDentist);
}

export function* fetchMyFamilyWatcher () {
  yield* takeLatest(MY_FAMILY_REQUEST, fetchMyFamily);
}

export function* fetchMyDentist () {
  try {
    // const requestURL = '/api/v1/FETCH_MY_DENTIST';
    // const response = yield call(request, requestURL);
    const response = yield call(fetchMyDentistMock);

    yield put(myDentistFetched(response.data));
  } catch (err) {
    yield put(myDentistFetchingError(err));
  }
}

export function* fetchMyFamily () {
  try {
    // const requestURL = '/api/v1/FETCH_MY_FAMILY';
    // const response = yield call(request, requestURL);
    const response = yield call(fetchMyFamilyMock);

    yield put(myFamilyFetched(response.data));
  } catch (err) {
    yield put(myFamilyFetchingError(err));
  }
}

// All sagas to be loaded
export default [
  userDashboardSaga,
  dentistDashboardSaga,
];
