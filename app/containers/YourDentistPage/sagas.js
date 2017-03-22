/*
Your Dentist Page Sagas
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
  setDentist,
  setDentistErrors,

  setSentReview,
} from './actions';
import {
  DENTIST_REQUEST,
  SUBMIT_REVIEW_FORM,
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
  const watcherA = yield fork(dentistFetcher);
  const watcherB = yield fork(submitReviewFormWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

/*
Fetch
------------------------------------------------------------
*/
function* dentistFetcher () {
  yield* takeLatest(DENTIST_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/dentist');
      yield put(setDentist(response.data));
    } catch(err) {
      yield put(setDentistErrors(err));
    }
  });
}

/*
Send Review
------------------------------------------------------------
*/
function* submitReviewFormWatcher() {
  while (true) {
    const { payload, dentistId } = yield take(SUBMIT_REVIEW_FORM);

    try {
      const requestURL = `/api/v1/dentists/${dentistId}/review`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      const response = yield call(request, requestURL, params);
      const message = "Your review has been submitted.";
      yield put(toastrActions.success('', message));

      yield put(setSentReview(response.data, dentistId));

    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);

      yield put(toastrActions.error('', 'Please fix errors on the form!'));
      yield put(stopSubmit('sendReview'));
    }
  }
}
