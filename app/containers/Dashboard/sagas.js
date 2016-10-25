import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from 'utils/request';

import {
  MY_DENTIST_REQUEST,
  MY_FAMILY_REQUEST,
  MY_PATIENTS_REQUEST,
  CONVERSATION_REQUEST,
  SUBMIT_MESSAGE_FORM,
  SUBMIT_CLIENT_REVIEW_FORM,
} from 'containers/Dashboard/constants';

import {
  myDentistFetched,
  myDentistFetchingError,
  myFamilyFetched,
  myFamilyFetchingError,
  myPatientsFetched,
  myPatientsFetchingError,
  conversationFetched,
  conversationFetchingError,
} from 'containers/Dashboard/actions';


// Individual exports for testing
export function* userDashboardSaga () {
  const watcherA = yield fork(fetchMyDentistWatcher);
  const watcherB = yield fork(fetchMyFamilyWatcher);
  const watcherC = yield fork(fetchMyPatientsWatcher);
  const watcherD = yield fork(submitMessageFormWatcher);
  const watcherE = yield fork(submitClientReviewFormWatcher);
  const watcherF = yield fork(fetchConversationWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
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

export function* fetchMyPatientsWatcher () {
  yield* takeLatest(MY_PATIENTS_REQUEST, fetchMyPatients);
}

export function* fetchConversationWatcher () {
  yield* takeLatest(CONVERSATION_REQUEST, fetchConversation);
}

export function* fetchMyDentist () {
  try {
    const requestURL = '/api/v1/users/me/dentist';
    const response = yield call(request, requestURL);

    yield put(myDentistFetched(response.data));
  } catch (err) {
    yield put(myDentistFetchingError(err));
  }
}

export function* fetchMyFamily () {
  try {
    const requestURL = '/api/v1/users/me/family-members';
    const response = yield call(request, requestURL);

    yield put(myFamilyFetched(response.data));
  } catch (err) {
    yield put(myFamilyFetchingError(err));
  }
}

export function* fetchMyPatients () {
  try {
    const requestURL = '/api/v1/users/me/clients';
    const response = yield call(request, requestURL);

    yield put(myPatientsFetched(response.data));
  } catch (err) {
    yield put(myPatientsFetchingError(err));
  }
}

export function* fetchConversation (action) {
  const { payload } = action;

  try {
    const requestURL = `/api/v1/users/me/messages/${payload.recipientId}`;
    const response = yield call(request, requestURL);

    yield put(conversationFetched(response.data.messages || []));
  } catch (err) {
    yield put(conversationFetchingError(err));
  }
}

export function* submitMessageFormWatcher () {
  while (true) {
    const {
      payload: {
        recipientId,
        body,
      },
    } = yield take(SUBMIT_MESSAGE_FORM);

    try {
      const requestURL = `/api/v1/users/me/messages/${recipientId}`;
      const params = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      yield call(request, requestURL, params);

      yield put(toastrActions.success('', 'Your message has been sent!'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* submitClientReviewFormWatcher () {
  while (true) {
    const {
      payload: {
        dentistId,
        body,
      }
    } = yield take(SUBMIT_CLIENT_REVIEW_FORM);
    // payload.isAnonymous = payload.isAnonymous === 'true';
    // yield take(SUBMIT_CLIENT_REVIEW_FORM);

    try {
      const requestURL = `/api/v1/dentists/${dentistId}/review`;
      const params = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      yield call(request, requestURL, params);
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
