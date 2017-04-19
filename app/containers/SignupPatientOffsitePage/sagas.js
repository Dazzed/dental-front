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
import { change, stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// app
import request from 'utils/request';

// local
import {
  // fetch dentist
  setDentist,
  setDentistError,

  // checkout
  clearEditingCheckout,

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
*/
function* dentistFetcher () {
  yield* takeLatest(DENTIST_REQUEST, function* handler (action) {
    const {
      dentistId,
    } = action;

    try {
      const response = yield call(request, `/api/v1/dentists/${dentistId}/no-auth`);
      yield put(setDentist(response.data));

    } catch(err) {
      yield put(setDentistError(err));
    }
  });
}

/*
Signup
------------------------------------------------------------
TODO: omit the `id` property on each member???
        - but don't delete it from the member object stored in the state in case the
          signup fails and we still need it (to identify members if there are
          further change).

TODO: remove the user from the `user.members` array (if they opted in to the membership)?
        - again, don't update the redux state w/ this change

For both, see:

  - https://trello.com/c/jVMGmXBz/84-patient-create-offsite-patient-signup-page
  - https://gigster.slack.com/archives/G3PCN7J69/p1492596171530996?thread_ts=1492589510.012543&cid=G3PCN7J69
*/
function* signupWatcher () {
  while (true) {
    const { user, paymentInfo, } = yield take(SIGNUP_REQUEST);

    // NOTE: When making the subsequent checkout request, be sure to use the
    //       `userId` that was created on the server and included in the
    //       `signupResponse`.  Do not use `user.id`, since it is a locally
    //       created temporary id only used / understood by the frontend.
    const signupResponse = yield call(makeSignupRequest, user);

    if (signupResponse) {
      // TODO: sending the checkout info is disabled until the endpoint is working
      const checkoutResponse = true;
      // const checkoutResponse = yield call(makeCheckoutRequest, paymentInfo, signupResponse.user.id);

      if (checkoutResponse) {
        yield put(signupSuccess({
          fullName: `${user.firstName} ${user.lastName}`,
          loginEmail: user.email,
        }));
      }
    }
  }
}

function* makeSignupRequest (user) {
  try {
    const requestURL = '/api/v1/accounts/signup';
    const params = {
      method: 'POST',
      body: JSON.stringify(user),
    };

    const response = yield call(request, requestURL, params);
    return response;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);
    yield put(toastrActions.error('', 'Please fix the errors regarding your account information in Step 1!'));
    yield put(stopSubmit('checkout', null));
    yield put(change('checkout', 'cardCode', null));
    return;
  }
}

function* makeCheckoutRequest (paymentInfo, userId) {
  const allowedFields = {
    card: pick(
      payload,
      'fullName',
      'number',
      'expiry',
      'cvc',
      'zip',
    ),

    cancellationFeeWaiver: payload.cancellationFeeWaiver,
    periodontalDiseaseWaiver: payload.periodontalDiseaseWaiver,
    reEnrollmentFeeWaiver: payload.reEnrollmentFeeWaiver,
    termsAndConditions: payload.termsAndConditions,
  };
  allowedFields.card.address = `${payload.address}, ${payload.state}, ${payload.city}`;

  try {
    const requestURL = `/api/v1/users/${userId}/payments`;
    const params = {
      method: 'POST',
      body: JSON.stringify(allowedFields),
    };

    const response = yield call(request, requestURL, params);
    yield put(clearEditingCheckout);

    return response;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);
    yield put(toastrActions.error('', 'Please fix the errors regarding your payment information in Step 3!'));
    yield put(stopSubmit('checkout', errors));
    yield put(change('checkout', 'cardCode', null));
    return;
  }
}
