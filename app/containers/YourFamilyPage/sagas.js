/*
Patient Family Page Sagas
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
  setFamilyMembers,
  setFamilyMembersErrors,

  setAddedMember,
  setEditedMember,
  setRemovedMember,
} from './actions';
import {
  FAMILY_MEMBERS_REQUEST,
  SUBMIT_MEMBER_FORM,
  REMOVE_MEMBER_REQUEST,
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
  const watcherA = yield fork(familyMembersFetcher);
  const watcherB = yield fork(submitMemberFormWatcher);
  const watcherC = yield fork(removeMemberWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

function* familyMembersFetcher () {
  yield* takeLatest(FAMILY_MEMBERS_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/members');
      yield put(setFamilyMembers(response.data));
    } catch(err) {
      yield put(setFamilyMembersErrors(err));
    }
  });
}

function* submitMemberFormWatcher () {
  while (true) {
    const { payload, userId } = yield take(SUBMIT_MEMBER_FORM);
    const memberId = payload.id;

    if (memberId === undefined) {
      yield submitAddMemberForm(payload, userId);
    }
    else {
      yield submitEditMemberForm(payload, userId, memberId);
    }
  }
}

function* submitAddMemberForm(payload, userId) {
  try {
    const requestURL = `/api/v1/users/${userId}/members`;
    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been added.`;
    yield put(toastrActions.success('', message));

    yield put(setAddedMember(response.data, userId));
    yield put(requestPendingAmount(userId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

function* submitEditMemberForm (payload, userId, memberId) {
  try {
    const requestURL = `/api/v1/users/${userId}/members/${memberId}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been modified.`;
    yield put(toastrActions.success('', message));

    yield put(setEditedMember(response.data, userId));
    yield put(requestPendingAmount(userId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

function* removeMemberWatcher () {
  while (true) {
    const { payload, userId } = yield take(REMOVE_MEMBER_REQUEST);

    try {
      const requestURL = `/api/v1/users/${userId}/members/${payload.id}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(setRemovedMember(payload.id, userId));
      yield put(requestPendingAmount(userId));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}
