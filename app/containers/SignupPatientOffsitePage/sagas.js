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
import findIndex from 'lodash/findIndex';
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
TODO: remove the user from the `user.members` array (if they opted in to the membership)?
        - again, don't update the redux state w/ this change

See:

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
    const signupResponse = yield call(makeSignupRequest, user, paymentInfo);

    if (signupResponse !== false) {
      const realUserId = signupResponse.data[0].id;
      const checkoutResponse = yield call(makeCheckoutRequest, paymentInfo, realUserId);

      if (checkoutResponse !== false) {
        yield put(signupSuccess({
          fullName: `${user.firstName} ${user.lastName}`,
          loginEmail: user.email,
        }));
      }
    }
  }
}

function* makeSignupRequest (user, paymentInfo) {
  // NOTE: The user and each member have fake `id` fields to keep track of them
  //       while the user is filling out the form.  These need to be removed,
  //       but without messing up the existing objects in case they are still
  //       needed (i.e. a signup error occurs and the user must change some
  //       information before submitting again).
  //
  // NOTE: The user is also included in the members array if they have opted
  //       into the membership.  They need to be removed, but again without
  //       messing up the existing objects in case they are still needed.
  const cleanedMembers = user.members
    .filter((member) => {
      return member.id !== user.id;
    })
    .map((member) => {
      return {
        ...member,
        id: undefined,
      };
    });

  const cleanedUser = {
    ...user,
    id: undefined,
    address: paymentInfo.address,
    city: paymentInfo.city,
    state: paymentInfo.state,
    zipCode: paymentInfo.zip,

    members: cleanedMembers,
  };

  try {
    const requestURL = '/api/v1/accounts/signup';
    const params = {
      method: 'POST',
      body: JSON.stringify(cleanedUser),
    };

    const response = yield call(request, requestURL, params);
    return response;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);
    yield put(toastrActions.error('', 'Please fix the errors regarding your account information in Step 1!'));
    yield put(stopSubmit('checkout', null));
    yield put(change('checkout', 'cardCode', null));
    return false;
  }
}

function* makeCheckoutRequest (paymentInfo, userId) {
  const allowedFields = {
    card: pick(
      paymentInfo,
      'fullName',
      'number',
      'expiry',
      'cvc',
      'zip',
    ),

    cancellationFeeWaiver: paymentInfo.feeWaiver,
    periodontalDiseaseWaiver: paymentInfo.periodontalDiseaseWaiver,
    reEnrollmentFeeWaiver: paymentInfo.feeWaiver,
    termsAndConditions: paymentInfo.termsAndConditions,
  };
  allowedFields.card.address = `${paymentInfo.address}, ${paymentInfo.state}, ${paymentInfo.city}`;

  try {
    const requestURL = `/api/v1/users/${userId}/payments`;
    const params = {
      method: 'POST',
      body: JSON.stringify(allowedFields),
    };

    const response = yield call(request, requestURL, params);
    yield put(clearEditingCheckout());

    return response;

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);
    yield put(toastrActions.error('', 'There was an issue with your payment information.  Please correct it in Step 3!'));
    yield put(stopSubmit('checkout', errors));
    yield put(change('checkout', 'cardCode', null));
    return false;
  }
}
