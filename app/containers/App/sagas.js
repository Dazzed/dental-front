import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';

import request from 'utils/request';

import {
  dentistSpecialtiesSuccess,
  requestServicesSuccess,
} from './actions';

import {
  DENTIST_SPECIALTIES_REQUEST,
  SERVICES_REQUEST,
} from './constants';


function* loadDentistSpecialties () {
  yield* takeLatest(DENTIST_SPECIALTIES_REQUEST, function* () {
    try {
      const specialties = yield call(request, '/api/v1/dentist-specialties');
      yield put(dentistSpecialtiesSuccess(specialties));
    } catch (e) {
      console.log(e);
    }
  });
}


function* requestServices () {
  yield* takeLatest(SERVICES_REQUEST, function* () {
    try {
      const services = yield call(request, '/api/v1/services');
      yield put(requestServicesSuccess(services));
    } catch (e) {
      console.log(e);
    }
  });
}

function* toastrRemover () {
  yield* takeLatest(LOCATION_CHANGE, function* () {
    yield put(toastrActions.clean());
  });
}


export default [
  loadDentistSpecialties,
  requestServices,
  toastrRemover,
];
