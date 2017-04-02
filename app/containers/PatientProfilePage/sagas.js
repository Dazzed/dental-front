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
import { stopSubmit } from 'redux-form';
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

  // add / edit review
  setAddedReview,
  setEditedReview,

  // remove review
  setRemovedReview,
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
  const watcherB = yield fork(familyMembersFetcher);
  const watcherC = yield fork(submitMemberFormWatcher);
  const watcherD = yield fork(removeMemberWatcher);
  const watcherE = yield fork(submitProfileFormWatcher);
  const watcherF = yield fork(submitReviewFormWatcher);
  const watcherG = yield fork(removeReviewWatcher);
  const watcherH = yield fork(submitAccountSecurityFormWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
}

/*
Fetch Dentist
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
Fetch Members
------------------------------------------------------------
*/
function* familyMembersFetcher () {
  yield* takeLatest(FAMILY_MEMBERS_REQUEST, function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/members');
      yield put(setFamilyMembers(response.data));
    } catch(err) {
      yield put(setFamilyMembersErrors(err));
    }
  });
}

/*
Add / Edit Member
------------------------------------------------------------
*/
function* submitMemberFormWatcher () {
  while (true) {
    const { payload, userId } = yield take(SUBMIT_MEMBER_FORM);

    if (payload.id === undefined) {
      yield submitAddMemberForm(payload, userId);
    }
    else {
      yield submitEditMemberForm(payload, userId);
    }
  }
}

function* submitAddMemberForm(payload, userId) {
  try {
    const requestURL = `/api/v1/users/${userId}/members`;
    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been added.`;
    yield put(toastrActions.success('', message));

    yield put(setAddedMember(response.data, userId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('familyMember', errors));
  }
}

function* submitEditMemberForm (payload, userId) {
  try {
    const requestURL = `/api/v1/users/${userId}/members/${payload.id}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `'${payload.firstName} ${payload.lastName}' has been modified.`;
    yield put(toastrActions.success('', message));

    yield put(setEditedMember(response.data, userId));

  } catch (err) {
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
    const { payload, userId } = yield take(REMOVE_MEMBER_REQUEST);

    try {
      const requestURL = `/api/v1/users/${userId}/members/${payload.id}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(setRemovedMember(payload.id, userId));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

/*
Edit Profile
------------------------------------------------------------
*/
function* submitProfileFormWatcher () {
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
    );

    try {
      const requestURL = `/api/v1/users/${userId}`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(allowedFields),
      };

      const response = yield call(request, requestURL, params);
      const message = `Your profile has been updated.`;
      yield put(toastrActions.success('', message));

      yield put(setUserData(response.data));

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
function* submitReviewFormWatcher () {
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
    const requestURL = `/api/v1/dentists/${dentistId}/review`;
    const params = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = "Your review has been submitted.";
    yield put(toastrActions.success('', message));

    yield put(setAddedReview(response.data, dentistId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('review', errors));
  }
}

function* submitEditReviewForm (payload, dentistId) {
  try {
    const requestURL = `/api/v1/dentists/${dentistId}/review/${payload.id}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, params);
    const message = `Your review has been updated.`;
    yield put(toastrActions.success('', message));

    yield put(setEditedReivew(response.data, dentistId));

  } catch (err) {
    const errors = mapValues(err.errors, (value) => value.msg);

    yield put(toastrActions.error('', 'Please fix errors on the form!'));
    yield put(stopSubmit('review', errors));
  }
}


/*
Remove Review
------------------------------------------------------------
*/
function* removeReviewWatcher () {
  while (true) {
    const { payload, dentistId } = yield take(REMOVE_REVIEW_REQUEST);

    try {
      const requestURL = `/api/v1/dentists/${dentistId}/review/${payload.id}`;
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
function* submitAccountSecurityFormWatcher () {
  while (true) {
    const { payload, userId } = yield take(SUBMIT_SECURITY_FORM);

    const allowedFields = pick(
      payload,
      'newEmail',
      'confirmNewEmail',
      'newPassword',
      'confirmNewPassword',
      'oldPassword',
    );

    try {
      const requestURL = `/api/v1/users/${userId}`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(allowedFields),
      };

      const response = yield call(request, requestURL, params);
      const message = `Your account security information has been updated.`;
      yield put(toastrActions.success('', message));

      yield put(setUserData(response.data));

    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);

      yield put(toastrActions.error('', 'Please fix errors on the form!'));
      yield put(stopSubmit('patientProfile', errors));
    }
  }
}
