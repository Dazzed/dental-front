import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';

import {
  fetchMaterialsSuccess
} from './actions';

function* main() {
  const watcherA = yield fork(fetchMaterials);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

function* fetchMaterials () {
  yield takeLatest('ADMIN_MARKETING_MATERIALS_FETCH', function* handler () {
    try {
      const requestURL = '/api/v1/admin/marketingMaterials/';
      const params = {
        method: 'GET',
      };
      const { marketingMaterials } = yield call(request, requestURL, params);

      yield put(fetchMaterialsSuccess(marketingMaterials));
    } catch (e) {
      console.log(e);
    }
  });
}

export default [
  main
];
