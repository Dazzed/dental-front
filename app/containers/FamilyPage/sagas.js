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
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { initialize } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// app
import request from 'utils/request';
import { setUserData } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  setFamilyMembers,
  setFamilyMembersErrors,
} from './actions';
import {
  FAMILY_MEMBERS_REQUEST
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

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
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
