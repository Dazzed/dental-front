import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';

import request from 'utils/request';

import {
  requestServicesSuccess,
} from './actions';

import {
  SERVICES_REQUEST,
} from './constants';

function* requestServices () {
  yield* takeLatest(SERVICES_REQUEST, function* handler () {
    try {
      const services = yield call(request, '/api/v1/services');
      yield put(requestServicesSuccess(services));
    } catch (e) {
      console.log(e);
    }
  });
}

function* toastrRemover () {
  yield* takeLatest(LOCATION_CHANGE, function* handler () {
    yield put(toastrActions.clean());
  });
}


export default [
  requestServices,
  toastrRemover,
];
