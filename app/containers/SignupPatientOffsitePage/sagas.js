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
import _ from 'lodash';
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { change, reset, stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';
import { setItem, removeItem } from 'utils/localStorage';

// app
import { meFromToken, setAuthState, setUserData } from 'containers/App/actions';
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

  //checkout
  STRIPE_CREATE_TOKEN
} from './constants';


/*
Sagas
================================================================================
*/

// Bootstrap sagas
export default [
  main
];

function* main() {
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
function* dentistFetcher() {
  yield* takeLatest(DENTIST_REQUEST, function* handler(action) {
    const {
      dentistId,
    } = action;

    try {
      const response = yield call(request, `/api/v1/dentists/details/${dentistId}/no-auth`);
      yield put(setDentist(response.data));

    } catch (err) {
      console.log("ERR");
      console.log(err)
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
function* signupWatcher() {
  while (true) {

    const { cardDetails, user, paymentInfo, isLoggedIn } = yield take(STRIPE_CREATE_TOKEN);
    // const { user, paymentInfo } = yield takeLatest(SIGNUP_REQUEST);
    const stripeToken = yield call(makeStripeCreateTokenRequest, cardDetails);

    if (stripeToken !== false) {
      // NOTE: When making the subsequent checkout request, be sure to use the
      //       `userId` that was created on the server and included in the
      //       `signupResponse`.  Do not use `user.id`, since it is a locally
      //       created temporary id only used / understood by the frontend.
      const signupResponse = yield call(makeSignupRequest, user, paymentInfo, stripeToken);

      if (signupResponse !== false) {
        // NOTE: The `paymentSourceAndSubscribe` call is authenticated, which means
        //       that the user account owner or their dentist must be logged in.
        //       If an existing account is logged in, assume it is the dentist and
        //       they just clicked the "Add Member" signup link on their dashboard.
        //       If noone is logged in, use the signup details to authenticate the
        //       user before proceeding.
        //
        //       TODO: If noone is currently logged in, should we de-authenticate
        //             the user after the `paymentSourceAndSubscribe` api call
        //             is completed?
        const realUserId = signupResponse.data[0].id;
        const loginResponse = yield call(makeLoginRequest, user, isLoggedIn);

        if (loginResponse !== false) {
          const paymentSourceAndSubscribeResponse = yield call(subscribe, stripeToken, realUserId);

          if (paymentSourceAndSubscribeResponse !== false) {
            // ensure form values are erased
            reset('signupPatient');
            reset('familyMember');
            reset('checkout');

            yield put(signupSuccess({
              fullName: `${user.firstName} ${user.lastName}`,
              loginEmail: user.email,
            }));
          }
        }
      }
    }
  }
}

function createStripeToken(cardDetails) {
  let stripe_obj = {
    name: cardDetails.name,
    number: cardDetails.number,
    cvc: cardDetails.cvc,
    exp_month: cardDetails.expiry.split('/')[0],
    exp_year: cardDetails.expiry.split('/')[1]
  };
  return new Promise((resolve, reject) => {
    Stripe.card.createToken({
      ...stripe_obj
    }, (status, response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response.id);
      }
    })
  });
}

function* makeStripeCreateTokenRequest(cardDetails) {
  try {
    const token = yield call(createStripeToken, cardDetails);
    return token;
  } catch (err) {
    // console.log('Error in creating stripe token');
    // console.log(err);

    yield put(toastrActions.error('', err.message || 'Please Enter Valid Card details.'));
    yield put(stopSubmit('checkout', null));
    yield put(change('checkout', 'cardCode', null));
    yield put(stopSubmit('signupPatient', {}));
    return false;
  }
}

function* makeSignupRequest(user, paymentInfo, stripeToken) {
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

    membershipId: user.membershipId === '-1' ? null : user.membershipId,

    members: cleanedMembers,
    stripeToken
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
    // const errors = mapValues(err.errors, (value) => value.msg);
    // We get err.errors as array if 500 or err.errors as object if 400.
    let errors;
    if (_.isArray(err.errors)) {
      errors = err.errors.reduce((acc, error) => {
        return {
          ...acc,
          [error.path]: error.value
        }
      },{});
    } else {
      errors = mapValues(err.errors, (value) => value.msg);
    }
    const formErrors = {};

    if (errors.email) {
      formErrors.user = {
        email: errors.email
      };
    }

    if (errors.number) {
      formErrors.user = {
        number: errors.number
      };
    }
    console.info(formErrors)
    if (Object.keys(formErrors).length === 0) {
      yield put(toastrActions.error('', 'An unknown error occurred.  Please double check the information you entered to see if anything appears to be incorrect.'));
    } else if (formErrors.user.email || formErrors.user.number) {
      yield put(toastrActions.error('', 'This email or phone number is already in use, please login to your account to make changes.'));
    }
    // else if (formErrors.user.email) {
    //   yield put(toastrActions.error('', 'The email address ' + err.errors.email.value + ' is already registered.  Please enter another email in Step 1.'));
    // } else if (formErrors.user.number) {
    //   yield put(toastrActions.error('', 'The entered phone number is already registered.  Please enter another phone number.'));
    // }
    else {
      yield put(toastrActions.error('', 'Please fix the errors regarding your account information in Step 1!'));
    }

    yield put(stopSubmit('checkout', null));
    yield put(change('checkout', 'cardCode', null));
    yield put(stopSubmit('signupPatient', formErrors));
    return false;
  }
}

function* makeLoginRequest(user, isLoggedIn) {
  if (isLoggedIn) {
    return true;
  }

  else {
    try {
      const loginData = {
        email: user.email,
        password: user.password,
      };

      const requestURL = `/api/v1/accounts/login`;
      const params = {
        method: 'POST',
        body: JSON.stringify(loginData),
      };

      const response = yield call(request, requestURL, params);

      // dispatch action to set user details to app.currentUser
      yield put(setAuthState(true));

      // set auth token to localstorage
      yield call(setItem, 'auth_token', response.token);

      // load details of authenticated user
      yield put(meFromToken());

      // Post-processor is in common/sagas/index.js

      return true;

    } catch (err) {
      console.log(err);
      yield put(toastrActions.error('', 'An unknown error occurred.  Please double check the information you entered to see if anything appears to be incorrect.'));
      yield put(stopSubmit('checkout', null));
      yield put(change('checkout', 'cardCode', null));
      yield put(stopSubmit('signupPatient', null));
      return false;
    }
  }
}

function* subscribe(stripeToken, userId) {
  try {
    const requestURL = `/api/v1/users/${userId}/account/payment/subscribe`;
    const params = {
      method: 'POST',
    };

    const response = yield call(request, requestURL, params);
    return response;

  } catch (err) {
    const formErrors = {
      number: err.errors && err.errors.errorMessage
    }

    yield put(toastrActions.error('', 'There was a problem with your payment details, please correct them and proceed.'));
    yield put(stopSubmit('checkout', formErrors));
    yield put(change('checkout', 'cardCode', null));
    return false;
  }
}
