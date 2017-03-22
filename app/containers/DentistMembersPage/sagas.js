/*
Dentist Members Page Sagas
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
  fetchDentistInfoSuccess,
  fetchDentistInfoError,
  fetchPatientsSuccess,
  fetchPatientsError,

  setAddedMember,
  setEditedMember,
  setRemovedMember,
} from './actions';
import {
  FETCH_DENTIST_INFO_REQUEST,
  FETCH_PATIENTS_REQUEST,
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
  const watcherA = yield fork(dentistInfoFetcher);
  const watcherB = yield fork(patientsFetcher);
  const watcherC = yield fork(submitMemberFormWatcher);
  const watcherD = yield fork(removeMemberWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

/*
Fetch Dentist Info
------------------------------------------------------------
*/
function* dentistInfoFetcher () {
  yield* takeLatest(FETCH_DENTIST_INFO_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/users/me/dentist-info')
      yield put(fetchDentistInfoSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistInfoError(error));
    }
  });
}

/*
Fetch Patients
------------------------------------------------------------
*/
function* patientsFetcher () {
  yield* takeLatest(FETCH_PATIENTS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/users/me/members');
      yield put(fetchPatientsSuccess(response.data));
    } catch (error) {
      yield put(fetchPatientsError(error));
    }
  });
}

/*
Add / Edit Member
------------------------------------------------------------
*/
function* submitMemberFormWatcher () {
  while (true) {
    const { patient, payload } = yield take(SUBMIT_MEMBER_FORM);

    if (payload.id === undefined) {
      yield submitAddMemberForm(patient, payload);
    }
    else {
      yield submitEditMemberForm(patient, payload);
    }
  }
}

function* submitAddMemberForm(patient, payload) {
  try {
    const requestURL = `/api/v1/users/${patient.id}/members`;
    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been added.`;
    yield put(toastrActions.success('', message));

    yield put(setAddedMember(patient, response.data));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

function* submitEditMemberForm (patient, payload) {
  try {
    const requestURL = `/api/v1/users/${patient.id}/members/${payload.id}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been modified.`;
    yield put(toastrActions.success('', message));

    yield put(setEditedMember(patient, response.data));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

/*
Remove Member
------------------------------------------------------------
*/
function* removeMemberWatcher () {
  while (true) {
    const { patient, payload } = yield take(REMOVE_MEMBER_REQUEST);

    try {
      const requestURL = `/api/v1/users/${patient.id}/members/${payload.id}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(setRemovedMember(patient, payload.id));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}
