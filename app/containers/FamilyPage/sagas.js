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
import { selectCurrentUser } from 'containers/App/selectors';
import { requestPendingAmount } from 'containers/Authorize.net/actions';

// local
import {
  setFamilyMembers,
  setFamilyMembersErrors,

  setAddedMember,
  setEditedMember,
} from './actions';
import {
  FAMILY_MEMBERS_REQUEST,
  SUBMIT_MEMBER_FORM,
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

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
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
    let requestURL = `/api/v1/users/${userId}/members`;
    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    let message = `'${payload.firstName} ${payload.lastName}' has been added.`;
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
    let requestURL = `/api/v1/users/${userId}/members/${memberId}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    let message = `'${payload.firstName} ${payload.lastName}' has been modified.`;
    yield put(toastrActions.success('', message));

    yield put(setEditedMember(response.data, userId));
    yield put(requestPendingAmount(userId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}
