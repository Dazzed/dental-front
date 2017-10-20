import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import { change, reset, stopSubmit } from 'redux-form';

import request from 'utils/request';

import {
  addCustomMembership as globalAddCustomMembership,
  editCustomMembership as globalEditCustomMembership,
  deleteCustomMembership as globalDeleteCustomMembership
} from 'containers/App/actions';

import {
  addCustomMembership,
  editCustomMembership,
  deleteCustomMembership
} from 'containers/DentistMembersPage/actions';

import {
  fetchDentistInfoSuccess,
  fetchDentistInfoError,
  createMembershipSuccess,
  createMembershipError,
  editMembershipSuccess,
  editMembershipError,
  deleteMembershipSuccess,
  deleteMembershipError,
} from './actions';

function* main () {
  const watcherA = yield fork(dentistInfoWatcher);
  const watcherB = yield fork(createMembershipWatcher);
  const watcherC = yield fork(editMembershipWatcher);
  const watcherD = yield fork(deleteMembershipWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

function* dentistInfoWatcher () {
  yield takeLatest('CUSTOM_MEMBERSHIP_PAGE_FETCH_DENTIST_INFO', function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/dentist-info?custom_plans=true');
      yield put(fetchDentistInfoSuccess(response.data));
    } catch (e) {
      yield put(fetchDentistInfoError(e));
    }
  });
}

function* createMembershipWatcher () {
  yield takeLatest('CUSTOM_MEMBERSHIP_PAGE_CREATE_MEMBERSHIP', function* handler ({ payload }) {
    try {
      const requestURL = '/api/v1/dentists/me/custom-memberships';
      const body = JSON.stringify(payload);
      const params = {
        method: 'POST',
        body
      };

      const { membership: addedMembership } = yield call(request, requestURL, params);
      yield put(reset('createPlan'));
      const message = `Plan named '${payload.planName}' has been added.`;
      yield put(toastrActions.success('', message));
      yield put(createMembershipSuccess(addedMembership));
      // convey to global and DentistMembersPage actions.
      yield put(globalAddCustomMembership(addedMembership));
      yield put(addCustomMembership(addedMembership));
    } catch (e) {
      console.log(e);
      if (e.errors) {
        yield put(toastrActions.error('', e.errors));
      } else {
        yield put(toastrActions.error('', 'There was an error please try again later'));
      }
      yield put(createMembershipError());
    }
  });
}

function* editMembershipWatcher () {
  yield takeLatest('CUSTOM_MEMBERSHIP_PAGE_EDIT_MEMBERSHIP', function* handler ({ payload }) {
    try {
      const requestURL = '/api/v1/dentists/me/custom-memberships';
      const body = JSON.stringify(payload);
      const params = {
        method: 'PATCH',
        body
      };

      const { memberships } = yield call(request, requestURL, params);
      const message = 'Plan has been Edited Successfully.';
      yield put(toastrActions.success('', message));
      yield put(editMembershipSuccess(memberships));
      // convey to global and DentistMembersPage actions.
      yield put(globalEditCustomMembership(memberships));
      yield put(editCustomMembership(memberships));
    } catch (e) {
      console.log(e);
      if (e.errors) {
        yield put(toastrActions.error('', e.errors));
      } else {
        yield put(toastrActions.error('', 'There was an error please try again later'));
      }
      yield put(editMembershipError());
    }
  });
}

function* deleteMembershipWatcher () {
  yield takeLatest('CUSTOM_MEMBERSHIP_PAGE_DELETE_MEMBERSHIP', function* handler ({ payload }) {
    try {
      const requestURL = '/api/v1/dentists/me/custom-memberships';
      const body = JSON.stringify({ membershipId: payload });
      const params = {
        method: 'DELETE',
        body
      };

      const { memberships } = yield call(request, requestURL, params);
      const message = 'Plan has been Deleted Successfully.';
      yield put(toastrActions.success('', message));
      yield put(deleteMembershipSuccess(memberships));
      // convey to global and DentistMembersPage actions.
      yield put(globalDeleteCustomMembership(memberships));
      yield put(deleteCustomMembership(memberships));
    } catch (e) {
      console.log(e);
      if (e.errors) {
        yield put(toastrActions.error('', e.errors));
      } else {
        yield put(toastrActions.error('', 'There was an error please try again later'));
      }
      yield put(deleteMembershipError());
    }
  });
}

export default [ main ];
