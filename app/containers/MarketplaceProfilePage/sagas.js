import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';

import { dentistProfileSuccess } from './actions';

function* main () {
  const watcherA = yield fork(dentistProfileRequestWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

function* dentistProfileRequestWatcher () {
  while (true) {
    yield takeLatest('MARKETPLACE_DENTIST_PROFILE_REQUEST', function* handler ({ payload: id }) {
      try {
        const requestURL = `/api/v1/dentists/${id}`;
        const params = {
          method: 'GET'
        };
        const { data: dentist } = yield call(request, requestURL, params);

        yield put(dentistProfileSuccess(dentist));
      } catch (e) {
        console.log(e);
      }
    });
  }
}

export default [ main ];
