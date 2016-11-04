import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import get from 'lodash/get';

import request from 'utils/request';

import {
  MY_FAMILY_REQUEST,
} from 'containers/Dashboard/constants';

import {
  SUBMIT_MEMBER_FORM,
  DELETE_MEMBER_REQUEST,
} from 'containers/MyFamilyMembers/constants';

import {
  myFamilyFetched,
  myFamilyFetchingError,
} from 'containers/Dashboard/actions';

import {
  memberAdded,
  memberEdited,
  memberDeleted,
} from 'containers/MyFamilyMembers/actions';

// Individual exports for testing
export function* defaultSaga () {
  const watcherA = yield fork(fetchMyFamilyWatcher);
  const watcherB = yield fork(submitFormWatcher);
  const watcherC = yield fork(deleteMemberWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

export function* fetchMyFamilyWatcher () {
  yield* takeLatest(MY_FAMILY_REQUEST, fetchMyFamily);
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

export function* submitFormWatcher () {
  while (true) {
    const { payload, userId } = yield take(SUBMIT_MEMBER_FORM);
    const memberId = payload.id;

    try {
      let requestURL = `/api/v1/users/${userId || 'me'}/family-members`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      if (memberId) {
        params.method = 'PUT';
        requestURL += `/${memberId}`;
      }

      const response = yield call(request, requestURL, params);

      let message;
      if (memberId) {
        message = `'${payload.firstName} ${payload.lastName}'
          has been modified.`;
      } else {
        message = `'${payload.firstName} ${payload.lastName}'
          has been added.`;
      }
      yield put(toastrActions.success('', message));

      if (memberId) {
        yield put(memberEdited(response.data));
      } else {
        yield put(memberAdded(response.data));
      }
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* deleteMemberWatcher () {
  while (true) {
    const { payload, userId } = yield take(DELETE_MEMBER_REQUEST);

    try {
      const requestURL =
        `/api/v1/users/${userId || 'me'}/family-members/${payload.id}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(memberDeleted(payload.id));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
