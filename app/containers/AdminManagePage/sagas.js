import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { change, stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

import {
  FETCH_ACCOUNT_MANAGERS,
  FETCH_ACCOUNT_MANAGERS_SUCCESS,
  FETCH_ACCOUNT_MANAGERS_ERROR,
  ADD_MANAGER,
  ADD_MANAGER_SUCCESS,
  EDIT_MANAGER,
  EDIT_MANAGER_SUCCESS
} from './constants';

import request from 'utils/request';

export default [
  main
];

function* main() {
  const watcherA = yield fork(managersFetcher);
  const watcherB = yield fork(addManagerWatcher);
  const watcherC = yield fork(editManagerWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

function* managersFetcher() {
  yield* takeLatest(FETCH_ACCOUNT_MANAGERS, function* handler() {
    try {
      const managers = yield call(request, '/api/v1/admin/managers/list' );
      yield put({
        type: FETCH_ACCOUNT_MANAGERS_SUCCESS,
        payload: managers
      });
    } catch (e) {
      console.log(e)
      yield put({type: FETCH_ACCOUNT_MANAGERS_ERROR});
    }
  });
}

function* addManagerWatcher() {
  while(true) {
    yield takeLatest(ADD_MANAGER, function* handler({payload}) {
      try {
        const requestURL = '/api/v1/admin/managers';
        let body = JSON.stringify(payload);
        const params = {
          method: 'POST',
          body
        };

        const response = yield call(request, requestURL, params);
        const message = `'${payload.firstName} ${payload.lastName}' has been added.`;
        yield put(toastrActions.success('', message));
        yield put({
          type: ADD_MANAGER_SUCCESS,
          payload: response,
        });
      } catch (e) {
        console.log(e);
        if (typeof e.errors === 'string')
          yield put(toastrActions.error('', e.errors.toString()));
        else {
          for (let key in e.errors)
          yield put(toastrActions.error('', e.errors[key].msg));
        }
        yield put(stopSubmit('addManager', {}));
      }
    })
  }
}

function* editManagerWatcher() {
  while(true) {
    yield takeLatest(EDIT_MANAGER, function* handler({payload}) {
      try {
        const requestURL = '/api/v1/admin/managers';
        let body = JSON.stringify(payload);
        const params = {
          method: 'PATCH',
          body
        };

        const response = yield call(request, requestURL, params);
        const message = `'${payload.firstName} ${payload.lastName}' has been edited.`;
        yield put(toastrActions.success('', message));
        yield put({
          type: EDIT_MANAGER_SUCCESS,
          payload: response,
        });
      } catch (e) {
        console.log(e);
        if (typeof e.errors === 'string')
          yield put(toastrActions.error('', e.errors.toString()));
        else {
          for (let key in e.errors)
          yield put(toastrActions.error('', e.errors[key].msg));
        }
        yield put(stopSubmit('editManager', {}));
      }
    })
  }
}
