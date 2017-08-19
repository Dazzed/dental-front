/*
Patient Profile Page Sagas
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
import {
  // edit profile / security
  setUserData,
} from 'containers/App/actions';
import request from 'utils/request';

// local
import {
  // fetch dentist
  setDentist,
  setDentistErrors,

  // fetch members
  setFamilyMembers,
  setFamilyMembersErrors,

  // add / edit member
  setAddedMember,
  setEditedMember,

  // remove member
  setRemovedMember,

  // edit profile
  clearEditingProfile,

  // add / edit review
  setAddedReview,
  setEditedReview,

  // remove review
  setRemovedReview,

  // edit security
  clearEditingSecurity,

  // edit payment info
  clearEditingPayment,
} from './actions';
import {
  // fetch
  DENTIST_REQUEST,
  FAMILY_MEMBERS_REQUEST,

  // add / edit / remove member
  SUBMIT_MEMBER_FORM,
  REMOVE_MEMBER_REQUEST,

  // edit profile
  SUBMIT_PROFILE_FORM,

  // add / edit / remove review
  SUBMIT_REVIEW_FORM,
  REMOVE_REVIEW_REQUEST,

  // edit security
  SUBMIT_SECURITY_FORM,

  // edit payment info
  SUBMIT_PAYMENT_FORM,

  // cancel membership
  MEMBERSHIP_CANCEL_REQUEST,
} from './constants';


/*
Sagas
================================================================================
*/

// Bootstrap sagas
export default [
  main,
];

function* main() {
  const watcherA = yield fork(dentistFetcher);
  const watcherB = yield fork(familyMembersFetcher);
  const watcherC = yield fork(submitMemberFormWatcher);
  const watcherD = yield fork(removeMemberWatcher);
  const watcherE = yield fork(submitProfileFormWatcher);
  const watcherF = yield fork(submitReviewFormWatcher);
  const watcherG = yield fork(removeReviewWatcher);
  const watcherH = yield fork(submitAccountSecurityFormWatcher);
  const watcherI = yield fork(submitPaymentFormWatcher);
  const watcherJ = yield fork(cancelMembership);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
  yield cancel(watcherI);
  yield cancel(watcherJ);
}

/*
Fetch Dentist
------------------------------------------------------------
*/
function* dentistFetcher() {
  yield* takeLatest(DENTIST_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/users/me/my-dentist');
      yield put(setDentist(response.data));
    } catch (err) {
      yield put(setDentistErrors(err));
    }
  });
}

/*
Fetch Members
------------------------------------------------------------
*/
function* familyMembersFetcher() {
  yield* takeLatest(FAMILY_MEMBERS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/users/me/members');
      yield put(setFamilyMembers(response.data));
    } catch (err) {
      yield put(setFamilyMembersErrors(err));
    }
  });
}

/*
Add / Edit Member
------------------------------------------------------------
*/
function* submitMemberFormWatcher() {
  while (true) {
    yield takeLatest(SUBMIT_MEMBER_FORM, function* handler ({ patient, payload }) {
      if (payload.id === undefined) {
        yield submitAddMemberForm(patient, payload);
      }
      else {
        yield submitEditMemberForm(patient, payload);
      }
    });
  }
}

function* submitAddMemberForm (patient, payload) {
  try {
    const requestURL = `/api/v1/users/${patient.client.id}/members`;
    const body = JSON.stringify({
      parentMember: patient,
      member: payload
    });
    const params = {
      method: 'POST',
      body
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been added.`;
    yield put(toastrActions.success('', message));

    yield put(setAddedMember(patient, response.data));
  } catch (err) {
    console.log(err);
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

function* submitEditMemberForm(patient, payload) {

  const dentistId = payload.dentistId;
  try {
    let requestURL;
    if (payload.isEnrolling) {
      requestURL = `/api/v1/dentists/${dentistId}/subscription/plan/${payload.id}/re-enroll?membershipId=${payload.clientSubscription.membershipId}`;
    } else {
      requestURL = `/api/v1/dentists/${dentistId}/subscription/plan/${payload.clientSubscription.membershipId}/user/${payload.id}?subscriptionId=${payload.subscriptionId || payload.clientSubscription.id}`;
    }
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been modified.`;

    yield put(toastrActions.success('', message));

    yield put(setEditedMember(patient, payload));

  } catch (err) {
    console.log(err);
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

/*
Remove Member
------------------------------------------------------------
*/
function* removeMemberWatcher () {
  while (true) {
    const { patient, payload, dentistId } = yield take(REMOVE_MEMBER_REQUEST);
    console.log(patient, payload, dentistId);
    try {
      const requestURL = `/api/v1/dentists/${dentistId}/subscription/members/${payload.id}/plan`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(setRemovedMember(patient, payload.id));
    } catch (err) {
      console.log(err);
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

/*
Edit Profile
------------------------------------------------------------
*/
function* submitProfileFormWatcher() {
  while (true) {
    const { payload, userId } = yield take(SUBMIT_PROFILE_FORM);

    const allowedFields = pick(
      payload,
      'address',
      'city',
      'state',
      'zipCode',
      'phone',
      'contactMethod',
      'clientSubscription',
      'firstName',
      'lastName',
      'middleName',
      'birthDate',
      'sex',
      'familyRelationship'
    );

    try {
      const requestURL = `/api/v1/users/${userId}/members/${userId}`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(allowedFields),
      };

      const response = yield call(request, requestURL, params);
      const message = `Your profile has been updated.`;
      yield put(toastrActions.success('', message));

      yield put(setUserData(payload));
      yield put(clearEditingProfile());

    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);

      yield put(toastrActions.error('', 'Please fix errors on the form!'));
      yield put(stopSubmit('patientProfile', errors));
    }
  }
}

/*
Add / Edit Review
------------------------------------------------------------
*/
function* submitReviewFormWatcher() {
  while (true) {
    const { payload, dentistId } = yield take(SUBMIT_REVIEW_FORM);

    if (payload.id === undefined) {
      yield submitAddReviewForm(payload, dentistId);
    }
    else {
      yield submitEditReviewForm(payload, dentistId);
    }
  }
}

function* submitAddReviewForm(payload, dentistId) {
  try {
    const requestURL = `/api/v1/dentists/${dentistId}/reviews/review`;
    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = "Your review has been submitted.";
    yield put(toastrActions.success('', message));

    yield put(setAddedReview(response, dentistId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('review', errors));
  }
}

function* submitEditReviewForm(payload, dentistId) {
  try {
    const requestURL = `/api/v1/dentists/${dentistId}/reviews/review/${payload.id}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `Your review has been updated.`;
    yield put(toastrActions.success('', message));

    if (payload.rating) {
      payload.rating = Number.parseInt(payload.rating);
    }
    yield put(setEditedReview(payload, dentistId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('review', errors));
  }
}

function* cancelMembership() {
  yield* takeLatest(MEMBERSHIP_CANCEL_REQUEST, function* handler() {
    try {
      const requestURL = '/api/v1/memberships/cancel/me';
      const params = {
        method: 'DELETE',
        body: {}
      };

      const response = yield call(request, requestURL, params);
      const message = `Your membership has been cancelled.`;
      yield put(toastrActions.success('', message));
      yield put(setDentist({}));

    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);
      yield put(toastrActions.error('', 'Error cancelling your membership, please try again'));
    }
  });
}


/*
Remove Review
------------------------------------------------------------
*/
function* removeReviewWatcher() {
  while (true) {
    const { payload, dentistId } = yield take(REMOVE_REVIEW_REQUEST);

    try {
      const requestURL = `/api/v1/dentists/${dentistId}/reviews/review/${payload.id}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `Your review has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(setRemovedReview(payload.id, dentistId));

    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

/*
Edit Security
------------------------------------------------------------
*/
function* submitAccountSecurityFormWatcher() {
  while (true) {
    const { payload, user } = yield take(SUBMIT_SECURITY_FORM);

    try {
      const requestURL = `/api/v1/users/me/change-auth`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(payload),
      };

      const response = yield call(request, requestURL, params);
      const message = `Your account security information has been updated.`;
      yield put(toastrActions.success('', message));

      let updatedUser = {
        ...user,
      };
      if (payload.newEmail) {
        updatedUser.email = payload.newEmail;
      }
      yield put(setUserData(updatedUser));

      yield put(clearEditingSecurity());

    } catch (err) {
      if (get(err, 'meta.code') === 401) {
        const message = "Your 'Current Password' was incorrect.  Please re-enter it and submit the form again.";
        yield put(toastrActions.error('', message));
      }
      else {
        yield put(toastrActions.error('', "Please fix errors on the form and re-enter your 'Current Password'."));
      }

      const errors = mapValues(err.errors, (value) => value.msg);
      yield put(stopSubmit('accountSecurity', errors));

      yield put(change('accountSecurity', 'oldPassword', null));
    }
  }
}

/* Edit Payment Info
 * ------------------------------------------------------ */
function* submitPaymentFormWatcher() {
  while (true) {
    const { payload, dentistId, userId, } = yield take(SUBMIT_PAYMENT_FORM);

    const allowedFields = {
      card: pick(
        payload,
        'fullName',
        'number',
        'expiry',
        'cvc',
        'zip',
      ),
    };
    allowedFields.card.address = `${payload.address}, ${payload.state}, ${payload.city}`;

    try {
      const requestURL = `/api/v1/dentists/me/patients/${patient.id}/update-card`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(allowedFields),
      };

      const response = yield call(request, requestURL, params);
      const message = `Your account payment information has been updated.`;
      yield put(toastrActions.success('', message));

      yield put(clearEditingPayment());

    } catch (err) {
      // Map from known response errors to their form field identifiers.
      // In this case, Authorize.NET is the validator.
      const formErrors = {
        number: err.errors && err.errors.errorMessage
      }

      yield put(toastrActions.error('', 'There was an issue with your payment information.  Please correct it in Step 3!'));
      yield put(stopSubmit('checkout', formErrors));
      yield put(change('checkout', 'cardCode', null));
      return false;
    }
  }
}
