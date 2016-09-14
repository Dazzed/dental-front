import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from 'utils/request';

import {
  MY_DENTIST_REQUEST,
  MY_FAMILY_REQUEST,
  SUBMIT_CLIENT_MESSAGE_FORM,
  SUBMIT_CLIENT_REVIEW_FORM,
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
  const watcherC = yield fork(submitClientMessageFormWatcher);
  const watcherD = yield fork(submitClientReviewFormWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
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


export function* submitClientMessageFormWatcher () {
  while (true) {
    // const { payload } = yield take(SUBMIT_CLIENT_MESSAGE_FORM);
    yield take(SUBMIT_CLIENT_MESSAGE_FORM);

    try {
      // const requestURL = '/api/v1/SUBMIT_MESSAGE_FORM';
      // const params = {
      //   method: 'POST',
      //   body: JSON.stringify(payload),
      // };
      // const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('', 'Your message has been submitted!'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* submitClientReviewFormWatcher () {
  while (true) {
    // const { payload } = yield take(SUBMIT_CLIENT_REVIEW_FORM);
    // payload.isAnonymous = payload.isAnonymous === 'true';
    yield take(SUBMIT_CLIENT_REVIEW_FORM);

    try {
      // const requestURL = '/api/v1/SUBMIT_REVIEW_FORM';
      // const params = {
      //   method: 'POST',
      //   body: JSON.stringify(payload),
      // };
      // const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('', 'Your review has been submitted!'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}


// All sagas to be loaded
export default [
  userDashboardSaga,
  dentistDashboardSaga,
];
