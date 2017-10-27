/*
Accounting Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// app
import request from 'utils/request';

// local
import {
  setPatientPayments,
  setPatientPaymentsFailure,

  setDentistPayments,
  setDentistPaymentsFailure,

  // TODO: admin
} from './actions';
import {
  PATIENT_PAYMENTS_REQUEST,
  DENTIST_PAYMENTS_REQUEST,
  ADMIN_PAYMENTS_REQUEST,
} from './constants';

/* Saga Setup
 * ------------------------------------------------------ */
// Bootstrap sagas
export default [
  main,
];

function* main() {
  const watcherA = yield fork(patientPaymentsFetcher);
  const watcherB = yield fork(dentistPaymentsFetcher);
  const watcherC = yield fork(adminPaymentsFetcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

/* Fetch Patient Payments
 * ------------------------------------------------------ */
function* patientPaymentsFetcher() {
  yield* takeLatest(PATIENT_PAYMENTS_REQUEST, function* handler({ patientId, year }) {
    try {
      const response = yield call(request, `/api/v1/users/${patientId}/finances/${year}`);
      yield put(setPatientPayments(patientId, year, response.charges));
    } catch (err) {
      console.log("error - patientPaymentsFetcher", err);
      yield put(setPatientPaymentsFailure(err));
    }
  });
}

/* Fetch Dentist Payments
 * ------------------------------------------------------ */
function* dentistPaymentsFetcher() {
  yield* takeLatest(DENTIST_PAYMENTS_REQUEST, function* handler({ dentistId, year, month }) {
    try {
      const response = yield call(request, `/api/v1/dentists/${dentistId}/finances/${year}/${month}`);
      yield put(setDentistPayments(response.data));
    } catch (err) {
      console.log("error - dentistPaymentsFetcher", err);
      yield put(setDentistPaymentsFailure(err));
    }
  });
}

/* Fetch Admin Payments
 * ------------------------------------------------------ */
function* adminPaymentsFetcher() {
  // TODO
}
