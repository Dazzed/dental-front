import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import request from 'utils/request';

import { dentistSpecialtiesSuccess } from './actions';
import { DENTIST_SPECIALTIES_REQUEST } from './constants';


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


export default [
  loadDentistSpecialties,
];
