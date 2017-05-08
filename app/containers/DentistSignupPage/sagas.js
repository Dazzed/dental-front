/*
Dentist Signup Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import mapValues from 'lodash/mapValues';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { change, stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import 'whatwg-fetch';

// local
import {
  // fetch
  DENTIST_SPECIALTIES_REQUEST,
  PRICING_CODES_REQUEST,

  // upload image
  UPLOAD_IMAGE_REQUEST,

  // signup
  DENTIST_SIGNUP_REQUEST,
} from './constants';
import {
  // fetch
  dentistSpecialtiesSuccess,
  pricingCodesSuccess,

  // upload image
  uploadImageSuccess,

  // signup
  signupSuccess,
} from './actions';


/*
Main Saga
================================================================================
*/
// Bootstrap sagas
export default [
  main,
];

function* main () {
  const watcherA = yield fork(fetchDentistSpecialties);
  const watcherB = yield fork(fetchPricingCodes);
  const watcherC = yield fork(uploadImageWatcher);
  const watcherD = yield fork(signupWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}


/*
Fetch Sagas
================================================================================
*/
function* fetchDentistSpecialties () {
  yield* takeLatest(DENTIST_SPECIALTIES_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/dentist-specialties');
      yield put(dentistSpecialtiesSuccess(response.data));
    } catch (e) {
      console.log(e);
    }
  });
}

function* fetchPricingCodes () {
  yield* takeLatest(PRICING_CODES_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/pricing');
      yield put(pricingCodesSuccess(response.data));
    } catch (e) {
      console.log(e);
    }
  });
}


/*
Upload Image Sagas
================================================================================
*/
function* uploadImageWatcher () {
  while (true) {
    const { field, file, } = yield take(UPLOAD_IMAGE_REQUEST);

    try {
      const requestURL = `/api/v1/users/upload-photos`;
      const body = new FormData();
      body.append("photos", file);

      const params = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body,
      };

      // NOTE: Normally we call the `request` util, but that overrides the
      // Content-Type header and we need to keep it as FormData, so we're
      // calling Fetch directly here.
      const rawResponse = yield call(fetch, requestURL, params);

      if (rawResponse.ok) { // response.status >= 200 && response.status < 300
        const response = yield call(rawResponse.json.bind(rawResponse));
        const location = response.data[0].location;

        yield put(uploadImageSuccess(location));
        yield put(change('dentist-signup', field, location));
      }

      else {
        const error = new Error('Request endpoint Error');
        error.res = response;
        throw error;
      }

    } catch (err) {
      yield put(toastrActions.error('', 'This image could not be uploaded.'));
    }
  }
}


/*
Signup Sagas
================================================================================
*/
function* signupWatcher () {
  while (true) {
    // listen for the DENTIST_SIGNUP_REQUEST action dispatched on form submit
    const { payload } = yield take(DENTIST_SIGNUP_REQUEST);

    // execute the signup task
    const isSuccess = yield call(signup, payload);

    if (isSuccess) {
      yield put(signupSuccess({
        fullName: `${payload.user.firstName} ${payload.user.lastName}`,
        loginEmail: payload.user.email,
      }));
    }
  }
}

function* signup (data) {
  try {
    // send a post request with the desired user details
    yield call(request, '/api/v1/accounts/dentist-signup', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return true;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    // Map from known response errors to their form field identifiers.
    // Currently, only server-side-only validation is included most of the
    // validation is identical on the client and the server.  Thus a
    // non-malicious user will have already checked the other possible error
    // responses.
    const formErrors = {};

    if (errors.email) {
      formErrors.user = {};
      formErrors.user.email = errors.email;
      delete errors.email;
    }

    if (Object.keys(formErrors).length === 0) {
      yield put(toastrActions.error('', 'An unknown error occurred.  Please double check the information you entered to see if anything appears to be incorrect.'));
    }
    else if (Object.keys(formErrors).length === 1 && formErrors.email) {
      yield put(toastrActions.error('', 'The email address ' + user.email + ' is already registered.  Please use another.'));
    }
    else {
      yield put(toastrActions.error('', 'Please fix errors on the form!'));
    }

    yield put(stopSubmit('dentist-signup', formErrors));
    return false;
  }
}
