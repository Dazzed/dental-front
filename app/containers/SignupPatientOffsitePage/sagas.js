/*
Patient Offsite Signup Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// local
import {
  // fetch dentist
  setDentist,
  setDentistError,

  // signup
  signupSuccess,
} from './actions';
import {
  // fetch dentist
  DENTIST_REQUEST,

  // signup
  SIGNUP_REQUEST,
} from './constants';


/*
Sagas
================================================================================
*/

// Bootstrap sagas
export default [
  main
];

function* main () {
  const watcherA = yield fork(dentistFetcher);
  const watcherB = yield fork(signupWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

/*
Fetch Dentist
------------------------------------------------------------
TODO: get unauthed dentist API endpoint
        - dentist theming
        - membership plans
        - offices array
      https://trello.com/c/jVMGmXBz/84-patient-create-offsite-patient-signup-page
*/
function* dentistFetcher () {
  yield* takeLatest(DENTIST_REQUEST, function* handler (action) {
    const { dentistId, } = action;

    try {
      /*
      const response = yield call(request, `/api/v1/TODO/${dentistId}`);
      yield put(setDentist(response.data));
      */

      // TODO: tmp
      yield put(setDentist({
        logo: "https://www.brushandfloss.com/wp-content/uploads/sites/65/2016/04/Riccobene_Family_Dentistry_Rev-e1461600000454.png",
        offices: [
          {
            id: "18",
            officeName: "Johnny's Dentistry",
          },
        ],
      }));

    } catch(err) {
      // TODO: specific error for an invalid ID (i.e. 404 Not Found)
      //       vs. other errors (i.e. 500 Internal Server Error)
      yield put(setDentistError(err));
    }
  });
}

/*
Signup
------------------------------------------------------------
TODO: omit the `id` property on each member
      but don't delete it from the member object stored in the state in case the
      signup fails and we still need it (to identify members if there are
      further change).
*/
function* signupWatcher () {
  while (true) {
    const { payload, } = yield take(SIGNUP_REQUEST);

    try {
      const requestURL = '/api/v1/accounts/signup';
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      const response = yield call(request, requestURL, params);
      yield put(signupSuccess(`${payload.firstName} ${payload.lastName}`));

    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);

      yield put(toastrActions.error('', 'Please fix the errors on the form!'));
      yield put(stopSubmit('patientOffsiteSignup', errors));
    }
  }
}
